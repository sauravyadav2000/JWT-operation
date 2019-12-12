const express = require("express");
const router = new express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./verifyTokens");

//!Registering A User
router.post("/register", async (req, res) => {
  //Hashing a password
  const salt = await bcrypt.genSalt(10);
  const hashedPasssword = await bcrypt.hash(req.body.password, salt);

  //Creating a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPasssword
  });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//!Loging In User
router.post("/login", async (req, res) => {
  //checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email doesnt exist");
  }
  //Checking for password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Password not found");
  }

  //Create anf assign a token
  const token = jwt.sign({ _id: user._id }, "thisispractice");
  res.header("auth-token", token).send(token); //we are sending the token in header with name auth-token

  res.send("Successfully logged in");
});

module.exports = router;
