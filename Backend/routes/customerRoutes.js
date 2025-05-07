import express from 'express';
import { addCustomer, getCustomers,deleteUserController,getcustomer } from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addCustomer', addCustomer);
router.get('/', getCustomers);
router.delete('/deleteCustomerController/:id', deleteUserController);
router.get('/getcustomer/:id', getcustomer);



export default router;
