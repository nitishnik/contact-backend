const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Get all users
//@route GET /api/users
//@access public

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc Register a new user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.send(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.send(400);
    throw new Error("User already exists");
  } else {
    // hash password
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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const users = await User.findOne({ email: email });
  if (users) {
    const isMatch = await bcrypt.compare(password, users.password);
    if (isMatch) {
      const accessToken = jwt.sign(
        {
          user: {
            id: users.id,
            username: users.username,
            email: users.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        _id: users._id,
        username: users.username,
        email: users.email,
        accessToken: accessToken,
      });
    } else {
      res.status(401);
      throw new Error("Email or password is incorrect");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc Current user details
//@route GET /api/users/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { getUsers, registerUser, loginUser, currentUser };
