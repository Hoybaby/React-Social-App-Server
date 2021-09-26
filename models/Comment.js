const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  body: String,
  createdAt: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Comment", commentSchema);
