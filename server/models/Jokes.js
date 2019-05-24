const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JokesSchema = new Schema(
  {
    title: String,
    joke: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    rating: Number,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Jokes = mongoose.model("Jokes", JokesSchema);
module.exports = Jokes;
