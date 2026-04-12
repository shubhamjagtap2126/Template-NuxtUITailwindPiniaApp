export default defineEventHandler(async (event) => {

  // const method = event.method;
  const { method, model, id = null, postData = {}, columns = [], filter = {} } = await readBody(event);
  // console.log('method', method, 'model', model, 'filter', filter, 'postData', postData, 'columns', columns);
  let response;
  const projection = columns?.reduce((acc: any, field: any) => {
    acc[field] = 1;
    return acc;
  }, {});
  // console.log(projection)
  switch (method) {
    case 'GET':
      if (id) {
        // convert the object or array containing z at the end of string to new Date(new Date(response).getTime() + 330 * 60000).toLocaleString()
        response = await getModel(model)?.findById(id).select(projection).lean();
        response = formatResponseDates(response);
      } else {
        // response = filter ? await getModel(model).find(filter).select(projection) : await getModel(model).find().select(projection);
        response = await getModel(model)?.find(filter).select(projection).lean();
        response = formatResponseDates(response);
        // console.log(response)
      }
      break;

    case 'POST':
      if (id) postData._id = id;
      let existing = [];
      if (filter && Object.keys(filter).length > 0) existing = await getModel(model).find(filter);
      console.log('existing', existing);
      if (existing.length > 0) {
        response = { error: `${model} Data already exists` };
        break;
      }
      response = await getModel(model).create(postData);
      break;

    case 'PUT':
      response = await getModel(model).updateOne({ _id: id }, { $set: postData });
      break;

    case 'DELETE':
      response = await getModel(model).deleteOne({ _id: id });
      break;

    default:
      // Handle other methods or return an error
      response = { error: `Method ${method} not allowed` };
  }

  // console.log(response);
  // encryptedData: encryptPayload(response)
  return encryptPayload(response);
});
