const { verify } = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../lib/bcryptHash");
const { cloudUpload } = require("../lib/cloudnary");
const userModel = require("../models/userModel");
const { generateToken } = require("../lib/jsonwebtoken");
const registerUser = async (req, res, next) => {
  const file = req.files.length >= 0 ? req.files[0] : {};
  const { username, email, password } = req.body;
  let userObject;

  try {
    if (!username || !email || !password) {
      next("all fields are required");
    } else {
      if (file) {
        const { url, public_id } = await cloudUpload(file.path, "avatar");
        userObject = {
          username,
          email,
          password: await hashPassword(password),
          avatar: {
            url,
            public_id,
          },
        };
      } else {
        userObject = {
          username,
          email,
          password: await hashPassword(password),
        };
      }
      const newUser = await userModel.create(userObject);
      res.status(201).json({
        success: true,
        status: 201,
        data: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateUser = (req, res) => {};
const deleteUserById = (req, res) => {};
const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.status(201).json({
    success: true,
    status: 201,
    data: user,
  });
};
const getAllUser = async (req, res) => {
  const { q } = req.query;
  const query = { $regex: "^" + q, $options: "i" };
  const users = q ? await userModel.find({ username: query }) : [];
  res.status(201).json({
    success: true,
    status: 201,
    data: users,
  });
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email });

    const hashPassword = existUser
      ? await comparePassword(password, existUser.password)
      : null;

    if (!hashPassword) {
      next("invalid creadentials");
    } else {
      const token = await generateToken(existUser._id);
      res.json({
        success: true,
        status: 201,
        data: { token, id: existUser._id },
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  updateUser,
  getAllUser,
  getUserById,
  loginUser,
  deleteUserById,
};
