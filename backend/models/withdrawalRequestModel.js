import mongoose from "mongoose";

const WithdrawRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    walletAddress: String,
    status: {
      type: Boolean,
    },
    hash: String,
  },
  {
    timestamps: true,
  }
);

const WithdrawRequest = mongoose.model(
  "WithdrawRequest",
  WithdrawRequestSchema
);
export default WithdrawRequest;
