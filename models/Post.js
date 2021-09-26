const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  // this allows us to later mongoose to automaticall populate user field
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);
