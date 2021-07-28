import { UserController } from '../controllers/UserController';
import { ErrorRouter } from '../errors/ErrorRouter';
import { authorization, permissions } from '../middlewares/jwt.middleware';
import {
  createUserValidator,
  updatePasswordValidator,
  updateUserValidator,
} from '../validators/uservalidators';

const router = new ErrorRouter();

router
  .route('/')
  .get(UserController.getUsers)
  .put(authorization, updateUserValidator, UserController.updateUser)
  .patch(
    authorization,
    updatePasswordValidator,
    UserController.updatePasswordUser
  )
  .post(createUserValidator, UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .delete(authorization, permissions, UserController.deleteUser);

export const userRoutes = router.router;
