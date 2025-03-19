const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModals = require("../models/authModal");

// Signup
const signup = async (req, res, next) => {
  const { firstname, lastname, gender, email, mobile, password , Addresses} = req.body;

  try {
    // Hash password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModals({
      firstname,
      lastname,
      gender,
      email,
      mobile,
      password: hashedPassword,
      Addresses
    });

    await newUser.save();
    res.status(201).json({ message: "Your account created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    next(err);
  }
};

// Signin
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await userModals.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: _, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // 1 hour
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Signin Error:", error);
    next(error);
  }
};

// logout

const logout = (req, res) => {
  res.clearCookie('access_token').status(200).json('logout success!');
};

module.exports = { signup, signin, logout };
