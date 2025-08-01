import express from 'express';
import { register, login } from '../contoller/authController.js';

const router = express.Router();

// Define routes
router.post("/register", register);

router.post("/login", login);

export default router;