const {
  registerUser,
  updateUser,
  getUserById,
  getAllUser,
  deleteUserById,
  loginUser,
} = require("../controlers/userControler");
const { protected } = require("../middleware/protected");
const { uploadFile } = require("../middleware/fileUpload");
const router = require("express").Router();

//define users route
router.post("/user", uploadFile("/profile"), registerUser);
router.put("/user", updateUser);
router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUserById);
router.post("/login", loginUser);

module.exports = router;
