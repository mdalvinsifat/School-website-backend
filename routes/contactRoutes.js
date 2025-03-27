const express = require("express");
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);        // Create
router.get("/", getAllContacts);        // Read All
router.get("/:id", getContactById);     // Read One
router.put("/:id", updateContact);      // Update
router.delete("/:id", deleteContact);   // Delete

module.exports = router;
