import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  services: [{ type: String }],
  safety: [{ type: String }],
  popular: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

packageSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
