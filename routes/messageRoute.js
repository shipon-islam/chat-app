const {
  createMessage,
  getMessageById,
  deleteMessage,
} = require("../controlers/messageControler");
const router = require("express").Router();

//define message routes
router.post("/message", createMessage);
router.get("/message/:id", getMessageById);
router.delete("/message/id", deleteMessage);

module.exports = router;
