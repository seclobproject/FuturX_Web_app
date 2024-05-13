import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
    },
    fixedValue: {
      type: String,
      default: "ABC",
    },
  },
  {
    timestamps: true,
  }
);

const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;
