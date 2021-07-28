import { BAD_REQUEST } from 'http-status-codes';
import { roles } from '../enums';
import { ErrorHandler } from '../errors/ErrorHandler';
import { RoleService } from '../services/RoleService';
import { Jwt } from '../utils/Jwt';

export const authorization: Handler = (req, res, next) => {
  try {
    let token: string = req.headers.authorization;
    token = token.split(' ')[1];

    const payload = Jwt.verifyToken(token);
    req.user = payload.user;

    next();
  } catch (error) {
    next(new ErrorHandler(BAD_REQUEST, 'Token invalid!'));
  }
};

export const permissions: Handler = async (req, res, next) => {
  const { id } = req.user;

  const root = await RoleService.checkRole(roles.ROOT, id);
  const admin = await RoleService.checkRole(roles.ADMIN, id);

  if (root || admin) {
    next();
    return;
  }

  next(new ErrorHandler(BAD_REQUEST, 'you dont have enough permissions'));
};
