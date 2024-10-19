import asyncHandler from "express-async-handler";

//@desc Register a user
//@route POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

//@desc Current user
//@router POST /users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

export { registerUser, loginUser, currentUser };
