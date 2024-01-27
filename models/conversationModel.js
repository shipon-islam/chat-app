const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const conversationModel = model("Conversation", conversationSchema);
module.exports = conversationModel;
