import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';
import Customer from '../models/Customer.js';

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    try {
    if (user && password===user.password ) {
        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
            success:true,
            user
        });
    } 
    else{
        res.status(200).json({success:false, message: 'Invalid credentials' });
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  
  }
};

export const createAdmin = async (req, res) => {
  const { email, name, password, role } = req.body;

  if (!email || !name || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username: name,
      password:password ,
      role
    });

    res.status(201).json({
      success: true,
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


  export const Profile= async (req, res) => {
    const {id}=req.params;
   
    try {
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user data" });
    }
  }


   export const CustmerProfile= async (req, res) => {
    const {id}=req.params;
   
    try {
      const user = await Customer.findById(id)
      if (!user) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user data" });
    }
  }

