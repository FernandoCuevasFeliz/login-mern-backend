import { OK } from 'http-status-codes';
import { UserService } from '../services/UserService';
import { Jwt } from '../utils/Jwt';

export class UserController {
  static getUser: Handler = async (req, res) => {
    const { id } = req.params;

    const user = await UserService.getOne(id);

    return res.status(OK).json({
      status: 'Ok!',
      data: user,
    });
  };

  static getUsers: Handler = async (req, res) => {
    const users = await UserService.getAll();

    return res.status(OK).json({
      status: 'Ok!',
      data: users,
    });
  };

  static createUser: Handler = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    const userData = { firstname, lastname, username, email, password };
    const user = await UserService.create(userData);

    return res.status(OK).json({
      status: 'OK!',
      message: 'User created!',
      token: Jwt.generateToken({ user: { id: user._id } }),
    });
  };
}
