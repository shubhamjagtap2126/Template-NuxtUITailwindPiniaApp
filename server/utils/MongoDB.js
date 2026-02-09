
import pLimit from 'p-limit';

const CONCURRENCY_LIMIT = 5;
const BATCH_SIZE = 1000;

/**
 * 1. MAPPING LOGIC (Internal)
 * Maps custom {field, operator, value} to MongoDB Comparison Operators ($gt, $lt, etc.)
 */
const mapFilter = (conditions) => {
  const query = {};
  if (!conditions || !Array.isArray(conditions)) return query;

  conditions.forEach(({ field, operator, value }) => {
    switch (operator) {
      case 'eq': query[field] = { $eq: value }; break;
      case 'neq': query[field] = { $ne: value }; break;
      case 'gt': query[field] = { $gt: value }; break;
      case 'lt': query[field] = { $lt: value }; break;
      case 'in': query[field] = { $in: Array.isArray(value) ? value : [value] }; break;
      case 'is.null': query[field] = { $eq: null }; break;
      case 'like': query[field] = { $regex: new RegExp(value, 'i') }; break;
    }
  });
  return query;
};

/**
 * 2. CREATE OPERATIONS
 * Batch inserts using insertMany for atomic-level document creation.
 */
export const bulkInsert = async (Model, dataArray) => {
  const chunks = Array.from({ length: Math.ceil(dataArray.length / BATCH_SIZE) }, (_, i) =>
    dataArray.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE)
  );

  let totalInserted = 0;
  for (const chunk of chunks) {
    const result = await Model.insertMany(chunk, { ordered: false });
    totalInserted += result.length;
  }
  return totalInserted;
};

/**
 * 3. READ OPERATIONS
 * memory-efficient stream using find() + Cursor Methods (.sort, .limit)
 */
export const streamRead = async function* (Model, conditions, options = {}) {
  const filter = mapFilter(conditions);
  const cursor = Model.find(filter)
    .sort(options.sort || { createdAt: -1 })
    .limit(options.limit || 0)
    .skip(options.skip || 0)
    .lean()
    .cursor();

  for await (const doc of cursor) {
    yield doc;
  }
};

/**
 * 4. UPDATE OPERATIONS
 * Uses updateMany with $set or $inc for performance.
 */
export const bulkUpdate = async (Model, updates) => {
  const limit = pLimit(CONCURRENCY_LIMIT);
  const operations = updates.map(u => ({
    updateMany: {
      filter: mapFilter(u.conditions),
      update: u.increment ? { $inc: u.data } : { $set: u.data },
      upsert: u.upsert || false
    }
  }));

  const chunks = Array.from({ length: Math.ceil(operations.length / BATCH_SIZE) }, (_, i) =>
    operations.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE)
  );

  const tasks = chunks.map(chunk => limit(() => Model.bulkWrite(chunk, { ordered: false })));
  const results = await Promise.all(tasks);

  return results.reduce((acc, res) => acc + res.modifiedCount, 0);
};

/**
 * 5. DELETE OPERATIONS
 */
export const bulkDelete = async (Model, conditionSets) => {
  const operations = conditionSets.map(set => ({
    deleteMany: { filter: mapFilter(set) }
  }));
  const res = await Model.bulkWrite(operations, { ordered: false });
  return res.deletedCount;
};

/**
 * 6. ADMINISTRATIVE: AGGREGATION & INDEXING
 */
export const aggregateData = async (Model, pipeline) => {
  return await Model.aggregate(pipeline);
};

export const ensureIndex = async (Model, fields) => {
  return await Model.collection.createIndex(fields);
};

/**
 * DYNAMIC AGGREGATION ENGINE
 * Executes a pipeline with Big Data optimizations.
 * * @param {import('mongoose').Model} Model - Mongoose Model
 * @param {Array} pipeline - Array of stages [$match, $group, etc.]
 * @param {Object} options - { allowDiskUse: true, batchSize: 1000 }
 */
export const runAggregation = async (Model, pipeline = [], options = {}) => {
  const defaultOptions = {
    allowDiskUse: true, // Critical for datasets exceeding 100MB RAM
    maxTimeMS: 60000    // 1-minute timeout for heavy analytics
  };

  console.time(`[MongoScale] Aggregate - ${Model.modelName}`);

  try {
    const results = await Model.aggregate(pipeline)
      .option({ ...defaultOptions, ...options });

    console.timeEnd(`[MongoScale] Aggregate - ${Model.modelName}`);
    return results;
  } catch (error) {
    console.error(`[Aggregation Error]: ${error.message}`);
    throw error;
  }
};

/**
 * AGGREGATION STREAMER
 * For pipelines that output millions of records (e.g., generating reports).
 */
export const streamAggregation = async function* (Model, pipeline = [], options = {}) {
  const cursor = Model.aggregate(pipeline)
    .option({ allowDiskUse: true, ...options })
    .cursor({ batchSize: 1000 })
    .exec();

  for await (const doc of cursor) {
    yield doc;
  }
};

/**
 * STAGE BUILDERS (Optional Helper for Dynamic Pipelines)
 */
export const stages = {
  match: (conditions) => ({ $match: mapFilter(conditions) }),
  group: (id, accumulators = {}) => ({ $group: { _id: id, ...accumulators } }),
  project: (fields) => ({ $project: fields }),
  lookup: (from, localField, foreignField, as) => ({
    $lookup: { from, localField, foreignField, as }
  }),
  unwind: (path) => ({ $unwind: path }),
  sort: (criteria) => ({ $sort: criteria }),
  limit: (n) => ({ $limit: n }),
  out: (collectionName) => ({ $out: collectionName })
};
