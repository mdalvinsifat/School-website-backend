const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  courseClass: { type: String, required: true },
  age: { type: String, required: true },
  description: { type: String, required: true },
  monthlyFee: { type: Number, required: true },
  classDuration: { type: String, required: true },
  totalClasses: { type: Number, required: true },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
