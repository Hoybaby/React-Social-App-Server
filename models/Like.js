const { model, Schema } = require("mongoose");

const likeSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Like", likeSchema);
