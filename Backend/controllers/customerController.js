import Customer from '../models/Customer.js';
import mongoose from 'mongoose';

// export const addCustomer = async (req, res) => {
//     const customer = await Customer.create(req.body);
//     res.status(201).json(customer);
// };




// Add new customer
export const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, reference } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email: normalizedEmail });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer with this email already exists',
      });
    }

    // Create new customer
    const newCustomer = new Customer({
      name,
      email: normalizedEmail,
      phone: phone || '',
      address: address || '',
      reference: reference || '',
      balance: 0,
    });

    const savedCustomer = await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: 'Customer added successfully',
      customer: savedCustomer,
    });

  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};




export const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json({customers});
};



export const deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Customer.findByIdAndDelete(id);
      if (!user) return res.status(404).json({success:false, message: 'Customer not found' });
      res.status(200).json({success:true, message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getcustomer = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Customer.findById(id);
      if (!user) return res.status(404).json({success:false, message: 'Customer not found' });
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };





export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;


        
        // Validate the ID
       

        // Extract updatable fields from request body
        const { name, email, phone, address, reference } = req.body;
        // console.log(req.body)
        
        // Find the customer by ID
        const customer = await Customer.findById(id);
        
        // console.log(customer)
        
        if (!customer) {
            return res.status(404).json({ 
                success: false, 
                message: 'Customer not found' 
            });
        }

        // Prepare update object
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;
        if (reference) updateData.reference = reference;
        // if (balance !== undefined) updateData.balance = parseFloat(balance) || 0;

        // Update the customer
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            updateData,
            
        );
        

        res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            customer: updatedCustomer
        });

    } catch (error) {
        console.error('Error updating customer:', error);
        
        // Handle duplicate key error (unique fields)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                success: false, 
                message: `${field} already exists` 
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Validation error',
                errors: messages 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        });
    }
};