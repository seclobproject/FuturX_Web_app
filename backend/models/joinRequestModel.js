import mongoose from "mongoose";

const JoiningRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    hash: String,
    status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const JoiningRequest = mongoose.model("JoiningRequest", JoiningRequestSchema);
export default JoiningRequest;
