import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const login = [
  check('username', 'Username is required!').notEmpty(),
  check('password', 'Password is not valid!').isLength({ min: 6 }),
];

export const loginValidator = validate(login);
