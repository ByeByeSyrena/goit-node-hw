const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

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

const removeContact = async (contactId) => {
  const { contacts } = await listContacts();

  const updatedContacts = contacts.filter(({ id }) => contactId !== id);
  await fs.writeFile("/models/contacts.json", JSON.stringify(updatedContacts));
};

const addContact = async (body) => {
  const { contacts } = await listContacts();
  contacts.push(body);

  await fs.writeFile("/models/contacts.json", JSON.stringify(contacts));
};

const updateContact = async (contactId, body) => {
  const { contacts } = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);
  const updatedContact = { ...contact, ...body };

  const updatedContacts = contacts.map((item) => {
    if (item.id === contactId) {
      return updatedContact;
    }
    return item;
  });
  await fs.writeFile("/models/contacts.json", JSON.stringify(updatedContacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
