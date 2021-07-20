import { UserController } from '../controllers/UserController';
import { ErrorRouter } from '../errors/ErrorRouter';

const router = new ErrorRouter();

router.get('/', UserController.getUsers);

export const userRoutes = router.router;
