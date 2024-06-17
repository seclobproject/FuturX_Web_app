import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const transactionSchema = new mongoose.Schema(
  {
    name:String,
    amount:Number,
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
    name:String,
    amount: Number,
    category:String,  
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
    walletAddress:{
      type: String
    },
    earning: {
      type: Number,
      default: 0
    },
    joiningAmount: {
      type: Number,
      default: 0
    },
    rebirthAmount: {
      type: Number,
      default: 0
    },
    rejoiningWallet: {
      type: Number,
      default: 0,
    },
    transactionID: {
      type: String,
    },
    currentPlan: {
      type: String,
      default: "beginner",
    },
    userStatus: {
      type: Boolean,
      default:false
    },
    verifyStatus: {
      type: String,
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
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    autoPool: {
      type: Boolean,
      default: false,
    },
    leaderIncomeHistory:[transactionSchema],
    leaderIncome:{
      type: Number,
      default: 0,
    },
    awardBonusHistory:[transactionSchema],
    awardBonus:{
      type: Number,
      default: 0,
    },
    autoPoolPlan: {
      type: String,
    },
    autoPoolAmount: {
      type: Number,
      default: 0,
    },
    levelIncome: {
      type: Number,
      default: 0,
    },
    autoPoolBank: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isLeader: {
      type: Boolean,
      default: false,
    },
    isPromoter: {
      type: Boolean,
      default: false,
    },
    rewardImage: {
      type: String,
    },
    rewards: {
      type: Number,
      default: 0,
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
      default: 0,
    },
    lastWallet: {
      type: String,
      default: "earning",
    },
    showWithdraw: {
      type: Boolean,
      default: true,
    },
    withdrawAmount: {
      type: Number,
      default: 0,
    },
    withdrawalHistory: [withdrawalSchema],
    generationIncome: {
      type: Number,
      default: 0,
    },
    levelBalance: {
      type: Number,
      default: 0,
    },
    sponsorshipIncome: {
      type: Number,
      default: 0,
    },
    overallIncome: {
      type: Number,
      default: 0,
    },
    savingsIncome: {
      type: Number,
      default: 0,
    },
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
