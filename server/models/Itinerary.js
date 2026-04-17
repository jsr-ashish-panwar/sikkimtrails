import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  startingPoint: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  spiritualFocus: { type: String, required: true },
  userLanguage: { type: String, default: 'English' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

itinerarySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;
