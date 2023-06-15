const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: {
      type: String,
      default: "user",  
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
