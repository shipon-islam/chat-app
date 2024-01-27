const {
  getConversation,
  createConversation,
} = require("../controlers/conversationControler");
const { protected } = require("../middleware/protected");
const router = require("express").Router();
//define message routes
router.get("/conversation", protected, getConversation);
router.post("/conversation", protected, createConversation);

module.exports = router;
