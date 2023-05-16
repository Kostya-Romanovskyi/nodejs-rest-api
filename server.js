const app = require("./app");

const mongoose = require("mongoose");
const { DB_HOST } = require("./config");

// const DB_HOST =
//   "mongodb+srv://Kostya:NDN0Md9DFnyCENmE@cluster0.6nxzqcy.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Database connection successful. Server running. Use our API on port: 3000."
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
