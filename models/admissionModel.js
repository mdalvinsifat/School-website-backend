const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  class: { type: String, required: true }
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;
