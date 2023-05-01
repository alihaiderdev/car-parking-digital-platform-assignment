import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';

export function connectToDB() {
  const dbUri = config.get('dbUri') as string;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log('Successfully connected to the database!'.magenta);
    })
    .catch((error: any) => {
      console.error(`Unable to connect to the database: ${error.message}!`.red);
      process.exit(1);
    });
}
