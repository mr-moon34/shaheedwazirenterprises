import express from 'express';
import { addTransaction, getTransactions,deletepermanent,gettotal, updateTransaction, deleteTransaction, getTrash, restoreTransaction,getCustomerTransactions } from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js';

const router = express.Router();

// router.use(protect);

router.post('/addTransaction', upload.fields([{ name: 'attachment' }, { name: 'invoice' }]), addTransaction);
router.get('/getTransactions', getTransactions);
router.put('/:id', upload.fields([{ name: 'attachment' }, { name: 'invoice' }]), updateTransaction);

router.delete('/deleteTransaction/:id', deleteTransaction);

router.get('/trash', getTrash);
router.put('/restore/:id', restoreTransaction);
router.get('/', getCustomerTransactions);
router.delete('/deletepermanent/:id', deletepermanent);
router.get('/gettotal', gettotal);




export default router;
