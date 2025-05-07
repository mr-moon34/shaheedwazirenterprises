import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from './config.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import cors from 'cors';
import connectDB from './db.js'

import path from "path";
const rootPath = path.resolve()

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });



app.use(express.static(path.join(rootPath, 'Frontend', 'dist')));

// Fallback route — catch anything not handled above
app.use((req, res, next) => {
  res.sendFile(path.join(rootPath, 'Frontend', 'dist', 'index.html'));
});