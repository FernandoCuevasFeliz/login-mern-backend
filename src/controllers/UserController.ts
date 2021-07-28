import { OK } from 'http-status-codes';
import { UserService } from '../services/UserService';
import { Jwt } from '../utils/Jwt';

export class UserController {
  static getUser: Handler = async (req, res): Promise<Response> => {
    const { id } = req.params;

    const user = await UserService.getOne(id);

    return res.status(OK).json({
      status: 'OK!',
      data: user,
    });
  };

  static getUsers: Handler = async (req, res): Promise<Response> => {
    const users = await UserService.getAll();

    return res.status(OK).json({
      status: 'OK!',
      data: users,
    });
  };

  static createUser: Handler = async (req, res): Promise<Response> => {
    const { firstname, lastname, username, email, password } = req.body;
    const userData = { firstname, lastname, username, email, password };
    const user = await UserService.create(userData);

    return res.status(OK).json({
      status: 'OK!',
      message: 'User created!',
      token: Jwt.generateToken({ user: { id: user._id } }),
    });
  };

  static loginUser: Handler = async (req, res): Promise<Response> => {
    const { username, password } = req.body;

    const user = await UserService.login(username, password);

    return res.status(OK).json({
      status: 'OK!',
      message: 'User logged!',
      token: Jwt.generateToken({ user: { id: user._id } }),
      data: user,
    });
  };

  static updateUser: Handler = async (req, res): Promise<Response> => {
    const { firstname, lastname, username, email, password } = req.body;
    const { id } = req.user;
    const userData = { firstname, lastname, username, email, password };

    const user = await UserService.update(id, userData);

    return res.status(OK).json({
      status: 'OK!',
      message: 'User Updated!',
      token: Jwt.generateToken({ user: { id: user._id } }),
    });
  };

  static updatePasswordUser: Handler = async (req, res): Promise<Response> => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { id } = req.user;

    const passwordData: changePassword = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };

    const user = await UserService.updatePassword(id, passwordData);

    return res.status(OK).json({
      status: 'OK!',
      message: 'User Updated!',
      token: Jwt.generateToken({ user: { id: user._id } }),
    });
  };

  static deleteUser: Handler = async (req, res): Promise<Response> => {
    const { id } = req.params;

    await UserService.delete(id);

    return res.status(OK).json({
      status: 'OK!',
      message: 'User deleted!',
    });
  };
}
