import dotenv from 'dotenv';

const Env = process.env;
const dotEnvConfig = {};

dotenv.config(dotEnvConfig);

export const port = Env.PORT || 5000;

export const DbURL = Env.MONGO_URI || 'mongodb://localhost/db_test';

export const secretKey = Env.SECRET_KEY || 'iamasecretkey';

export const userRoot: User = {
  firstname: Env.USER_FIRSTNAME,
  lastname: Env.USER_LASTNAME,
  username: Env.USER_USERNAME,
  email: Env.USER_EMAIL,
  password: Env.USER_PASSWORD,
};
