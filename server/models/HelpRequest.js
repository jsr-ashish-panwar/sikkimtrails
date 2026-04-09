import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

helpRequestSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);

export default HelpRequest;
