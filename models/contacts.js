const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile("/models/contacts.json");
    const contacts = JSON.parse(readContacts);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  const { contacts } = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
