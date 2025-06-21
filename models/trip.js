import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Trip', tripSchema);
