import { OK } from 'http-status-codes';
import { UserService } from '../services/UserService';

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
}
