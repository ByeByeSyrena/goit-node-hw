const logger = require("morgan");
const cors = require("cors");

const express = require("express");

const app = express();

// const dotenv = require("dotenv");

// const {
//   getUsers,
//   addUser,
//   getUser,
//   removeUser,
//   updateUser,
// } = require("./controllers/controllers");

// const {
//   validateContact,
//   validateFields,
// } = require("./middlewares/middlewares");

// dotenv.config({
//   path:
//     process.env.NODE_ENV === "development"
//       ? "./envs/dev.env"
//       : "./envs/prod.env",
// });

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

// app.use("/api/contacts/:id", validateContact);

// app.use("/api/contacts/:id", validateFields);

// app.get("/api/contacts", getUsers);

// app.post("/api/contacts", addUser);

// app.get("/api/contacts/:id", getUser);

// app.delete("/api/contacts/:id", removeUser);

// app.put("/api/contacts/:id", updateUser);

module.exports = app;

// Server restart
// netstat -ano | findstr :3001
// Task Manager - Details - stop process with that IPD
