import bcrypt from "bcrypt";
import prismaClinet from "../lib/prisma.js";
import jwt from "jsonwebtoken";

//TODO: Register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // HASH Password

    const hashPassword = await bcrypt.hash(password, 10);

    let user = await prismaClinet.user.findUnique({
      where: {
        email,
      },
    });

    if (user)
      return res.status(409).json("Someone register before with this email");

    user = await prismaClinet.user.create({
      data: {
        email,
        password: hashPassword,
        username,
      },
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};
//TODO: Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await prismaClinet.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return res.status(404).json({ message: "Invalid Credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    const age = 7 * 24 * 60 * 60 * 1000;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    const { password: userPassword, ...other } = user;

    res
      .cookie("token", token, { httpOnly: true, maxAge: age, sameSite: null })
      .status(200)
      .json(other);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login user" });
  }
};

// TODO : Logout
export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};
