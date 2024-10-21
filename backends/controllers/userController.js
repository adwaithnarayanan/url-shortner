import asyncHandler from "express-async-handler";
import { createUser, loginUserProfile } from "../database/table.js";

//@desc Register a user
//@route POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    // res.status(403).json({ status: 403, message: "All fields are mandatory" });
    res.status(403);
    throw new Error("All fields are mandatory");
  }

  const resposne = await createUser({ username, email, password });
  res.status(resposne.status).json(resposne);
});

//@desc Login user
//@route POST /users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403);
    // res.json({ status: 403, message: "All fields are mandatory" });
    throw new Error("All fields are mandatory");
  }

  const response = await loginUserProfile({ email, password });

  res.status(response.status).json(response);
});

//@desc Current user
//@router POST /users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
