import { check } from 'express-validator';
import { validate } from '../middlewares/validator.middleware';

const createUser = [
  check('firstname', 'Firstname is required!').notEmpty(),
  check('lastname', 'Lastname is required!').notEmpty(),
  check('username', 'Username is required!').notEmpty(),
  check('email', 'Email is not valid!').isEmail(),
  check('password', 'Password is not valid!').isLength({ min: 6 }),
];

const updatePassword = [
  check('oldPassword', 'Old password is required!').isLength({ min: 6 }),
  check('newPassword', 'New password is required!').isLength({ min: 6 }),
  check('confirmNewPassword', 'Confirm new password is required!').isLength({
    min: 6,
  }),
];

const updateUser = [
  check('firstname', 'Firstname is required!').notEmpty(),
  check('lastname', 'Lastname is required!').notEmpty(),
  check('username', 'Username is required!').notEmpty(),
  check('email', 'Email is not valid!').isEmail(),
];

export const createUserValidator = validate(createUser);
export const updateUserValidator = validate(updateUser);
export const updatePasswordValidator = validate(updatePassword);
