// server/plugins/mongoose.server.ts
import mongoose from 'mongoose';

const cached = (global.mongoose ||= { conn: null, promise: null });

export default async () => {
  if (cached.conn) return;

  if (!cached.promise) {
    cached.promise = mongoose.connect(useRuntimeConfig().MONGODB_URI, { bufferCommands: false }).then((m) => {
      console.info('DB Connected');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset for retry on next request
    console.error('DB Error:', e);
  }
};
