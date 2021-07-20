import { connect, connection } from 'mongoose';
import { DbURL } from './config';

const optsDB = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

connect(DbURL, optsDB);
connection.once('open', () => console.log('DB is connect'));
connection.on('error', (error) => console.log('Error', error));
