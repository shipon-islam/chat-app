const { Schema, Model, model } = require("mongoose");

const userSchema = new Schema(
  {
    avatar: {
      url: String,
      public_id: String,
    },
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["online", "ofline"],
      default: "ofline",
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);
module.exports = userModel;
