const conversationModel = require("../models/conversationModel");

const getConversation = async (req, res, next) => {
  const id = req.user.id;
  try {
    const messages = await conversationModel
      .find({
        members: { $in: [id] },
      })
      .populate("members");
    res.status(200).json({
      success: true,
      status: 200,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
const createConversation = async (req, res, next) => {
  const senderId = req.user.id;
  const { receiverId } = req.body;
  try {
    if (!receiverId) {
      next("converstion not created");
    }
    const existCon = await conversationModel.findOne({
      members: { $in: [receiverId] },
    });

    if (existCon) {
      next("you have already in conversation ");
    } else {
      const conversation = await conversationModel.create({
        members: [senderId, receiverId],
      });

      res.status(200).json({
        success: true,
        status: 200,
        data: conversation,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversation,
  createConversation,
};
