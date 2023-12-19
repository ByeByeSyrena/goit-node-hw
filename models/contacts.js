const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(readContacts);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => contactId === id);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    // const contact = contacts.find(({ id }) => id !== contactId.toString());

    const updatedContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);
  const updatedContact = { ...contact, ...body };

  const updatedContacts = contacts.map((item) => {
    if (item.id === contactId) {
      return updatedContact;
    }
    return item;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
