const messageModel = require("../models/messageModel");
const createMessage = async (req, res, next) => {
  const { message, sender, conversation } = req.body;
  try {
    if (!message || !sender) {
      next("all fields are required");
    } else {
      const newMessage = await messageModel.create({
        message,
        sender,
        conversation,
      });
      res.status(201).json({
        success: true,
        status: 201,
        data: newMessage,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getMessageById = async (req, res, next) => {
  const conversationId = req.params.id;
  try {
    const messages = await messageModel
      .find({ conversation: conversationId })
      .populate(["sender"]);
    res.status(200).json({
      success: true,
      status: 200,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
const deleteMessage = (req, res) => {};
module.exports = {
  createMessage,
  getMessageById,
  deleteMessage,
};
