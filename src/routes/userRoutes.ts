import { UserController } from '../controllers/UserController';
import { ErrorRouter } from '../errors/ErrorRouter';
import { createUserValidator } from '../validators/uservalidators';

const router = new ErrorRouter();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', createUserValidator, UserController.createUser);

export const userRoutes = router.router;
