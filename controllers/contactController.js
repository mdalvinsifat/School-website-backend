const Contact = require("../models/contactModel");

// 📌 Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, description } = req.body;
    const newContact = new Contact({ name, phone, email, description });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: "Error creating contact", error });
  }
};

// 📌 Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

// 📌 Get Contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact", error });
  }
};

// 📌 Update Contact

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Ensure _id is not included in the update
    delete updateData._id;

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,         // Return updated document
      runValidators: true // Validate fields before updating
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      updatedContact,
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};



// 📌 Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};
