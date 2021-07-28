import { OK } from 'http-status-codes';
import { RoleService } from '../services/RoleService';

export class RoleController {
  static getRole: Handler = async (req, res): Promise<Response> => {
    const { id } = req.params;
    const dataRole: requestRole = { _id: id };

    const role = await RoleService.getOne(dataRole);

    return res.status(OK).json({
      status: OK,
      data: role,
    });
  };

  static getRoles: Handler = async (req, res): Promise<Response> => {
    const roles = await RoleService.getAll();

    return res.status(OK).json({
      status: OK,
      data: roles,
    });
  };

  static createRole: Handler = async (req, res): Promise<Response> => {
    const { name }: Role = req.body;

    const role = await RoleService.create({ name });

    return res.status(OK).json({
      status: OK,
      message: 'Role created!',
      data: role,
    });
  };
}
