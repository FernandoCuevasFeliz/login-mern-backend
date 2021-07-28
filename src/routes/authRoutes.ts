import { UserController } from '../controllers/UserController';
import { ErrorRouter } from '../errors/ErrorRouter';
import { loginValidator } from '../validators/auth.validators';
import { createUserValidator } from '../validators/uservalidators';

const router = new ErrorRouter();

router.post('/signin', createUserValidator, UserController.createUser);
router.post('/signup', loginValidator, UserController.loginUser);

export const authRoutes = router.router;
