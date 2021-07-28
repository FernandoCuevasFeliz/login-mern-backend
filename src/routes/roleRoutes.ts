import { RoleController } from '../controllers/RoleController';
import { ErrorRouter } from '../errors/ErrorRouter';
import { authorization, permissions } from '../middlewares/jwt.middleware';

const router = new ErrorRouter();

router
  .route('/')
  .get(authorization, RoleController.getRoles)
  .post(authorization, permissions, RoleController.createRole);

router.get('/:id', authorization, RoleController.getRole);

export const roleRoutes = router.router;
