import express from 'express';
import { createUser, getUsers,deleteUserController,updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createUser);
router.get('/', protect, getUsers);
router.delete('/:id', deleteUserController);
router.put('/updateUser/:id', updateUser);




export default router;

