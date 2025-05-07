import Customer from '../models/Customer.js';
import Transaction from '../models/Transaction.js';
import cloudinary from '../utils/cloudinary.js';

export const addTransaction = async (req, res) => {

    const { type, customer, date, rate, weight, amount, description,userid,amounttype } = req.body;
    const attachment = req.files?.attachment?.[0];
    const invoice = req.files?.invoice?.[0];
    // console.log(invoice)


    const attachmentUrl = attachment ? (await cloudinary.uploader.upload(attachment.path)).secure_url : '';
    const invoiceUrl = invoice ? (await cloudinary.uploader.upload(invoice.path)).secure_url : '';

    try{
if(type==='amount'){
  const transaction = await Transaction.create({
    type, customer, date, rate, weight, amount, description,addedby:userid,amounttype,
    attachment: attachmentUrl,
    invoice: invoiceUrl,
});
const user = await Customer.findById(customer);

if (!user) {
  return res.status(404).json({ message: 'Customer not found' });
}


  
  // console.log(amounttype)
  if (amounttype?.toLowerCase() === 'credit') {
    user.balance += Number(amount);
    await user.save();
  } else if (amounttype?.toLowerCase() === 'debit') {
    user.balance -= Number(amount);
    await user.save();
  }



res.status(201).json({transaction,success:true});
}
else{ const transaction = await Transaction.create({
  type, customer, date, rate, weight, amount, description,addedby:userid,
  attachment: attachmentUrl,
  invoice: invoiceUrl,
});
const user = await Customer.findById(customer);

if (!user) {
return res.status(404).json({ message: 'Customer not found' });
}



if (type?.toLowerCase() === 'credit') {
  user.balance += Number(amount);
  await user.save();
} else if (type?.toLowerCase() === 'debit') {
  user.balance -= Number(amount);
  await user.save();
}


await user.save();

res.status(201).json({transaction,success:true});
}}
catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
}
   
};


export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({ isDeleted: false }).populate({path:'customer',model:'Customer'}).populate({path:'addedby',model:'User'})
    res.json(transactions);
};

export const getCusTransactions = async (req, res) => {
    const {customerId}=req.params;
    const transactions = await Transaction.find({ customer: customerId })
    res.json(transactions);
};




// GET Transactions
export const getCustomerTransactions = async (req, res) => {
  try {
    const { customer, sort } = req.query;
    const query = {};

    if (customer) {
      query.customer = customer;
    }

    const transactions = await Transaction.find(query)
      .populate('customer', 'name') // populate customer name
      .sort(sort || '-createdAt');   // sort by date or createdAt

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const updateTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    Object.assign(transaction, req.body);
    await transaction.save();
    res.json(transaction);
};

export const deleteTransaction = async (req, res) => {
    console.log(req.params.id)
    const transaction = await Transaction.findById(req.params.id);
    transaction.isDeleted = true;
    await transaction.save();

    const customer = await Customer.findById(transaction.customer);
    if (customer) {
      if (transaction.type.toLowerCase() === 'credit') {
        customer.balance -=Number(transaction.amount);
      } else if(transaction.type.toLowerCase() === 'debit') {
        customer.balance += Number(transaction.amount);
      }else if(transaction.type.toLowerCase() === 'amount') {
        if (transaction.amounttype.toLowerCase() === 'credit') {
          customer.balance -= Number(transaction.amount);
        } else if (transaction.amounttype.toLowerCase() === 'debit') {
          customer.balance += Number(transaction.amount)
        }

        // if (type?.toLowerCase() === 'credit') {
        //   user.balance += Number(amount);
        //   await user.save();
        // } else if (type?.toLowerCase() === 'debit') {
        //   user.balance -= Number(amount);
        //   await user.save();
        // }
      }}
      await customer.save();
    res.json({ message: 'Transaction moved to trash' });
};

export const getTrash = async (req, res) => {
    const trashed = await Transaction.find({ isDeleted: true });
    res.json(trashed);
};

// export const restoreTransaction = async (req, res) => {
//   console.log(req.params.id)
//     const transaction = await Transaction.findById(req.params.id);
//     transaction.isDeleted = false;
//     await transaction.save();
//     res.json({ message: 'Transaction restored' });
// };
export const restoreTransaction= async (req, res) => {
  // console.log(req.params.id)
  try {
   
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: req.params.id, isDeleted: true },
      { $set: { isDeleted: false,deletedAt: null  } },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Deleted transaction not found' });
    }

    // Update customer balance
    const customer = await Customer.findById(transaction.customer);
    if (customer) {
      if (transaction.type === 'credit') {
        customer.balance += transaction.amount;
      } else if(transaction.type === 'debit') {
        customer.balance -= transaction.amount;
      }else if(transaction.type === 'amount') {
        if (transaction.amounttype === 'credit') {
          customer.balance += transaction.amount;
        } else if (transaction.amounttype === 'debit') {
          customer.balance -= transaction.amount;
        }
      }

      
      await customer.save();
    }

    res.json({ message: 'Transaction restored successfully', transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Permanent deletee
export const deletepermanent= async (req, res) => {
  // console.log(req.params.id)
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
     
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Deleted transaction not found' });
    }

    res.json({ message: 'Transaction permanently deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// Permanent deletee

  export const gettotal = async (req, res) => {
    try {
      const transactions = await Transaction.find({ isDeleted: false });
      const customers = await Customer.find();


  
      let totalCredit = 0;
      let totalDebit = 0;
  
      transactions.forEach((tx) => {
        const type = tx.type === 'amount' ? tx.amounttype : tx.type;
  
        if (type === 'credit') {
          totalCredit += tx.amount;
        } else if (type === 'debit') {
          totalDebit += tx.amount;
        }
      });
  
      res.json({
        totalCredit,
        totalDebit,
        net: totalCredit - totalDebit,
        customers
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

