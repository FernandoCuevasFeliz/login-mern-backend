import { BAD_REQUEST } from 'http-status-codes';
import { InjectModel } from '../decorators';
import { roles } from '../enums';
import { ErrorHandler } from '../errors/ErrorHandler';
import { Role } from '../models/Role';
import { UserService } from './UserService';

export class RoleService {
  @InjectModel(Role)
  private static readonly roleModel: Model<Role>;

  static async getOne(dataRole: requestRole) {
    const role = await this.roleModel.findOne({ ...dataRole });

    if (!role || role.name === roles.ROOT) {
      throw new ErrorHandler(BAD_REQUEST, 'Role not found');
    }
    return role;
  }

  static async getAll() {
    const allRoles = await this.roleModel.find({ name: { $ne: roles.ROOT } });
    return allRoles;
  }

  static async create(roleData: Role) {
    const { name }: Role = roleData;

    const roleExist = await this.roleModel.findOne({ name });

    if (roleExist) throw new ErrorHandler(BAD_REQUEST, 'Role Already exist!');

    const newRole = await this.roleModel.create({ name });

    return newRole;
  }

  static async checkRole(nameRole: string, id: string) {
    const role = await this.getOne({ name: nameRole });
    const user: User = await UserService.getOne(id);

    const userRoleExist: boolean = user.role.name === role.name;

    return userRoleExist;
  }
}
