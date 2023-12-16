const logger = require("morgan");
const cors = require("cors");

const express = require("express");

const app = express();

const fs = require("fs").promises;
const crypto = require("crypto");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./models/contacts");

const contactsRouter = require("./routes/api/contacts");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.get("/api/contacts", async (req, res) => {
  try {
    const { contacts } = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newContact = {
      name,
      email,
      phone,
      id: crypto.randomBytes(16).toString("hex"),
    };

    const contactsDB = await fs.readFile("/models/contacts.json");
    const contacts = JSON.parse(contactsDB);
    contacts.push(newContact);

    await fs.writeFile("/models/contacts.json", JSON.stringify(contacts));

    res.status(200).json({
      msg: "Success!",
      contact: newContact,
    });

    res.sendStatus(500);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json({
        message: "Success!",
        contact,
      });
    } else {
      res.status(404).json({
        message: "Not found!",
        contact,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactsDB = await fs.readFile("/models/contacts.json");
    const contacts = JSON.parse(contactsDB);
    const updatedContacts = contacts.filter(
      ({ contactId }) => contactId !== id
    );
    res.status(200).json({
      msg: "Success!",
      updatedContacts,
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const contactsDB = await fs.readFile("/models/contacts.json");
    const contacts = JSON.parse(contactsDB);
    const contact = contacts.find(({ contactId }) => contactId === id);
    const gatheredContact = [...contact, ...req.body];
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;

// Server restart
// netstat -ano | findstr :3001
// Task Manager - Details - stop process with that PID
