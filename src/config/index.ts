import dotenv from 'dotenv';

const Env = process.env;
const dotEnvConfig = {};

dotenv.config(dotEnvConfig);

export const port = Env.PORT || 5000;

export const DbURL = Env.MONGO_URI || 'mongodb://localhost/db_test';
