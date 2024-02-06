import express from 'express';
import { userController } from '../controllers/users'
const router = express.Router();

// /auth
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/admin-signup', userController.signup);
router.get('/check/:field/:value', userController.isAvailable);
router.get('/:userId/email-verify/:token', userController.verifyEmail);
router.post('/forgot-password', userController.sendPasswordResetOtp);
router.post('/reset-password', userController.resetPassword);

export default router;