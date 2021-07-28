import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { roleRoutes } from './roleRoutes';

import { userRoutes } from './userRoutes';

const router = Router();

router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/auth', authRoutes);

export const routes = router;
