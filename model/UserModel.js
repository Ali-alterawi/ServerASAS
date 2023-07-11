const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    service: {
      type: String,
    },
    photo: {
      type: String,
      required: false,
    },
    message: {
      type: String,
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
