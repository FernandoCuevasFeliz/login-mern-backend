import { userRoot } from '../config';
import { roles } from '../enums';
import { RoleService } from '../services/RoleService';
import { UserService } from '../services/UserService';

export const initializeSetup = async () => {
  const allRoles = await RoleService.getAll();

  if (allRoles.length === 0) {
    const roleRoot = await RoleService.create({ name: roles.ROOT });
    await RoleService.create({ name: roles.ADMIN });
    await RoleService.create({ name: roles.USER });

    await UserService.create({ ...userRoot, role: roleRoot._id });
  }
};
