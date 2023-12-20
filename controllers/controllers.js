const fs = require("fs").promises;
const crypto = require("crypto");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

exports.getUsers = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const id = crypto.randomBytes(16).toString("hex");
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    await addContact(newContact);
    res.status(200).json({
      contact: newContact,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      contact,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { id } = await removeContact(req.params.id);

    if (id) {
      res.status(200).json({
        message: "Contact deleted",
      });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!body) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const { contact } = await updateContact(id, body);

    if (contact) {
      res.status(200).json({
        contact,
      });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
