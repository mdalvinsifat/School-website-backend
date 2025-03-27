const express = require("express");
const {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission
} = require("../controllers/admissionController");

const router = express.Router();

router.post("/", createAdmission); // Create
router.get("/", getAdmissions); // Read All
router.get("/:id", getAdmissionById); // Read One
router.put("/:id", updateAdmission); // Update
router.delete("/:id", deleteAdmission); // Delete

module.exports = router;
