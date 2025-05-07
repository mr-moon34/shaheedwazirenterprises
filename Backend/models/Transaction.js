import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['credit', 'debit','amount'], required: true },
    amounttype: { type: String, enum: ['credit', 'debit'], },

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    addedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true },
    date: { type: Date, required: true },
    rate: { type: Number },
    weight: { type: Number },
    amount: { type: Number, required: true },
    description: { type: String },
    attachment: { type: String },
    invoice: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: {
        type: Date
      }

}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);

