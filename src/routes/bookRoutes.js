import express from 'express';
import {addBook, deleteBook, getBook, getRcomendedBook} from '../contoller/bookControllers.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/", protectRoute, addBook);
router.get("/", protectRoute, getBook);
router.delete("/:id", protectRoute, deleteBook);
router.get("/user", protectRoute, getRcomendedBook);

export default router;