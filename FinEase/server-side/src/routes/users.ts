import express from 'express';
import { authenticate, adminPass } from '../controllers/middleware/auth';
import {userController} from '../controllers/users'
const router = express.Router();

// /account
router.use(authenticate)
router.get('/', userController.accountInfo);
router.get('/me', userController.me);
router.get('/all-users', adminPass, userController.allUsers);
router.get("/balance", userController.getBalance);
router.get('/confirm-user', userController.getUserFullName);
router.put('/', userController.updateUser);

export default router;
