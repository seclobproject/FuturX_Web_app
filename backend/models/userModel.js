import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, double: true },
    lastAmount: { type: Number, double: true },
    category: String,
    basedOnWho: String,
    joinedLevel: String,
    status: String,
  },
  {
    timestamps: true,
  }
);
const withdrawalSchema = new mongoose.Schema(
  {
    amount: { type: Number, double: true },
    status: String,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    sponser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    ownSponserId: {
      type: String,
      required: true,
    },
    earning: {
      type: Number,
      default: 0,
      double: true,
    },
    joiningAmount: {
      type: Number,
      default: 0,
      double: true,
    },
    rejoiningWallet: {
      type: Number,
      default: 0,
      double: true,
    },
    currentPlan: {
      type: String,
    },
    userStatus: {
      type: Boolean,
      default: false,
    },
    transactions: [transactionSchema],
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    left: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    right: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    autoPool: {
      type: Boolean,
      default: false,
    },
    autoPoolPlan: {
      type: String,
    },
    autoPoolAmount: {
      type: Number,
      double: true,
      default: 0,
    },
    autoPoolBank: {
      type: Number,
      double: true,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    rewardImage: {
      type: String,
    },
    rewards: {
      type: Number,
      double: true,
    },
    hash: {
      type: String,
    },
    joiningRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JoiningRequest",
    },
    withdrawRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WithdrawRequest",
      },
    ],
    thirtyChecker: {
      type: Boolean,
      default: false,
    },
    totalWallet: {
      type: Number,
      double: true,
      default: 0,
    },
    lastWallet: {
      type: String,
    },
    showWithdraw: {
      type: Boolean,
      default: true,
    },
    withdrawalHistory: [withdrawalSchema],
    generationIncome: {
      type: Number,
      double: true,
      default: 0,
    },
    sponsorshipIncome: {
      type: Number,
      double: true,
      default: 0,
    },
    overallIncome: {
      type: Number,
      double: true,
      default: 0,
    },
    savingsIncome: {
      type: Number,
      double: true,
      default: 0,
    },
    requestCount: [
      {
        type: Number,
        
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Doing encryption before saving to the database
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);

export default User;
