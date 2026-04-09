import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  participants: { type: Number, required: true },
  specialRequests: { type: String },
  totalCost: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bookingSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
