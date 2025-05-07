import express from 'express';
import { loginUser,createAdmin,Profile } from '../middleware/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/createAdmin', createAdmin);
router.get('/getprofile/:id', Profile);


export default router;
