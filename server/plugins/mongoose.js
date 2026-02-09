// server/plugins/mongoose.server.ts
import mongoose from "mongoose";

export default async () => {
  const { MONGODB_URI_PROD, MONGODB_URI_DEV } = useRuntimeConfig().server;
  const link = process.env.NODE_ENV !== 'development' ? MONGODB_URI_PROD : MONGODB_URI_DEV;
  mongoose.connect(link)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

  mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err);
  });

};
