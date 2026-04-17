import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.5 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

experienceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
