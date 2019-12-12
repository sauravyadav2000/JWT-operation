const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Importing routes
const authRoute = require("./routes/auth");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Route middleware
app.use(authRoute);

//Connecting to database
mongoose.connect("mongodb://127.0.0.1:27017/jwt-api", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

//Connecting to server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
