const Admission = require("../models/admissionModel");

// Create Admission
exports.createAdmission = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Admissions
exports.getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Admission
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ message: "Admission not found" });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Admission
exports.updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admission) return res.status(404).json({ message: "Admission not found" });
    res.json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Admission
exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) return res.status(404).json({ message: "Admission not found" });
    res.json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
