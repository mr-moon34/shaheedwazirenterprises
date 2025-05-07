import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, username, email, password: hashedPassword,
    });

    res.status(201).json(user);
};

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

export const deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({success:true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }
  
      // Extract updatable fields from request body
      const { username, email, role ,password} = req.body;
      
      // Find the user by ID
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Check if the requesting user has permission to update
      // Add your authorization logic here if needed
      // Example: if (req.user.role !== 'admin' && req.user.id !== id) {...}
  
      // Prepare update object
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (password) updateData.password = password;

  
      // Update the user
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true } // Return the updated document and run validators
      ).select('-password'); // Exclude password from the response
  
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: updatedUser
      });
  
    } catch (error) {
      console.error('Error updating user:', error);
      
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
  
