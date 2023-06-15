const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models/index");

// const user = require("../models/user")

exports.user_signup = async (req, res) => {
  try {
    userData = await db.user.findOne({ email: req.body.email });

    if (userData) {
      return res.status(409).json({
        message: "Email exists",
      });
    } else {
      password = await bcrypt.hash(req.body.password, 10);

      const userSave = await db.user.create({
        email: req.body.email,
        password: password,
        mobile: req.body.mobile,
        fullName: req.body.fullName,
      });

      res.status(201).json({ message: "user created", newUser: userSave });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.user_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Enter required fields.!" });
    } else {
      matchUser = await db.user.findOne({ email: email });
      if (!matchUser) {
        return res.status(404).json({
          message: "user not registered",
        });
      }
      const match = bcrypt.compareSync(password, matchUser.password);

      if (match) {
        const token = jwt.sign(
          {
            email: matchUser.email,
            userId: matchUser._id,
            role: matchUser.role,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "365d",
          }
        );

        return res.status(200).json({
          message: "Auth successfull",
          token: token,
        });
      } else {
        return res.status(401).json({
          message: "password wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
