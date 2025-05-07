import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
