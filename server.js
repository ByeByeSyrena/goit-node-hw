// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(3002, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
