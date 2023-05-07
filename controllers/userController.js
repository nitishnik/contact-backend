const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
//@desc Register a new user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log({ username, email, password }, "{username, email, password}");
  if (!username || !email || !password) {
    res.send(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email: email });
  console.log(userAvailable, "userAvailable");
  if (userAvailable) {
    res.send(400);
    throw new Error("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    if (user) {
      res.status(201).json({ _id: user._id, email: user.email });
    } else {
      res.send(400);
      throw new Error("User data not valid");
    }
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  //   const contacts = await Contact.find();
  const users = {
    name: "Nitish kumar",
  };
  res.status(200).json(users);
});

//@desc Current user details
//@route GET /api/users/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
  //   const contacts = await Contact.find();
  const users = {
    name: "Nitish kumar",
  };
  res.status(200).json(users);
});

module.exports = { registerUser, loginUser, currentUser };
