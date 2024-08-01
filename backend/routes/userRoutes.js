import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Reward from "../models/rewardModel.js";
import { protect } from "../middleware/authMiddleware.js";
import { addCommissionToLine } from "./supportingFunctions/TreeFunctions.js";
import JoiningRequest from "../models/joinRequestModel.js";
import WithdrawRequest from "../models/withdrawalRequestModel.js";
import { awardCriteria, payUser } from "./supportingFunctions/payFunction.js";
import { sendMail } from "../config/mailer.js";
import { sendUSDT } from "../utils/sendUSDT.js";
import { proceedToWithdraw } from "./adminRoutes.js";

// import upload from "../middleware/fileUploadMiddleware.js";

// Register new user
// POST: By admin/sponser
const generateRandomString = () => {
  const baseString = "FX";
  const randomDigits = Math.floor(Math.random() * 9999999);
  return baseString + randomDigits.toString();
};

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const sponser = req.user._id;
    const ownSponserId = generateRandomString();
    const { name, email, password } = req.body;
    let isLeader=false;
    const existingUser = await User.findOne({ email });
    const sponserData=await User.findById(req.user._id);
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists!");
    }
    let leader
    if(sponserData.isPromoter){
      isLeader=true;
    }else if(sponserData.isLeader){
      leader=sponserData._id
    }else{
      leader=sponserData.leader
    }
// Hash password
const hashedPassword = bcrypt.hashSync(password, 10);

    
    const user = await User.create({
      sponser,
      leader,
      isLeader,
      verifyStatus:"pending",
      name,
      email,
      password:hashedPassword,
      ownSponserId,
    });

    if (user) {
      
    // Send confirmation email
    await sendMail(user.email, user.name, user.ownSponserId, password);

      res.status(200).json({
        id: user._id,
        sponser: user.sponser,
        name: user.name,
        email: user.email,
        ownSponserId: user.ownSponserId,
        currentPlan: user.currentPlan,
        msg:"user added successfull"
      });
    } else {
      res.status(400);
      throw new Error("Registration failed. Please try again!");
    }
  })
);

router.post(
  "/apply-for-verify",
  protect,
  asyncHandler(async (req, res) => {
    
    const { transactionID } = req.body;
    
    const userData=await User.findById(req.user._id);
    if (!userData) {
      res.status(400);
      throw new Error("User Not found!");
    }
    userData.verifyStatus="inactive";
    userData.transactionID = transactionID;
    await userData.save();
    if (userData) {
      res.status(200).json({
        msg:"user transaction id added successfull"
      });
    } else {
      res.status(400);
      throw new Error("Registration failed. Please try again!");
    }
  })
);

router.post(
  "/add-user-by-refferal",
  asyncHandler(async (req, res) => {
    const ownSponserId = generateRandomString();

    const { name, email, password, sponser } = req.body;

    let isLeader=false;
    const existingUser = await User.findOne({ email });
    const sponserData=await User.findById(sponser);
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists!");
    }
    let leader
    if(sponserData.isPromoter){
      isLeader=true;
    }else if(sponserData.isLeader){
      leader=sponserData._id
    }else{
      leader=sponserData.leader
    }
// Hash password
const hashedPassword = bcrypt.hashSync(password, 10);

    
    const user = await User.create({
      sponser,
      leader,
      isLeader,
      verifyStatus:"pending",
      name,
      email,
      password:hashedPassword,
      ownSponserId,
    });

    if (user) {
    await sendMail(user.email, user.name, user.ownSponserId, password);

      res.status(200).json({
        id: user._id,
        sponser: user.sponser,
        name: user.name,
        email: user.email,
        ownSponserId: user.ownSponserId,
        currentPlan: user.currentPlan,
        msg:"user added successfull"
      });
    } else {
      res.status(400);
      throw new Error("Registration failed. Please try again!");
    }
  })
);

// Login user/admin
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id },
        "secret_of_jwt_for_dreams-meta_5959",
        { expiresIn: "800d" }
      );

      res.status(200).json({
        _id: user._id,
        sponser: user.sponser,
        name: user.name,
        email: user.email,
        ownSponserId: user.ownSponserId,
        earning: user.earning,
        joiningAmount: user.joiningAmount,
        autoPool: user.autoPool,
        autoPoolPlan: user.autoPoolPlan,
        autoPoolAmount: user.autoPoolAmount,
        leaderIncome: user.leaderIncome,
        userStatus: user.userStatus,
        isAdmin: user.isAdmin,
        isPromoter: user.isPromoter,
        isLeader: user.isLeader,
        children: user.children,
        token_type: "Bearer",
        access_token: token,
        sts: "01",
        msg: "Login Success",
      });
    } else {
      res.status(401).json({ sts: "00", msg: "Login failed" });
    }
  })
);

// GET: User details to that user
router.get(
  "/get-user-details",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("joiningRequest");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ sts: "00", msg: "Data fetching failed!" });
    }
  })
);

// Get: upgrade the plan of user if he has enough balance in rejoining amount wallet
router.get(
  "/upgrade-level",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const admin = await User.findOne({ isAdmin: true });
    const promoters = await User.find({ isPromoter: true });

    if (user.joiningAmount >= 50) {
      const updatePromoter = async (promoter) => {
        console.log(promoter.name);
        promoter.leaderIncome += 2.5;
        promoter.leaderIncomeHistory.push({
          amount: 2.5,
          category: "rejoing promoters income",
          basedOnWho: user.name,
          status: "Approved",
        });
      
        try {
          const updatedLeader=await promoter.save();
              if(updatedLeader.leaderIncome>=10){
                const reciept= await sendUSDT(updatedLeader.walletAddress)
         if(reciept.status===1){
          await proceedToWithdraw(updatedLeader._id)
          updatedLeader.leaderIncome-=10;
          await updatedLeader.save();
         }
              }
          console.log("Promoter data saved successfully.");
        } catch (error) {
          console.error("Error saving Promoter data:", error);
        }
      };
      
      if (promoters.length >= 1) await updatePromoter(promoters[0]);
      if (promoters.length >= 2) await updatePromoter(promoters[1]);
      if (promoters.length >= 3) await updatePromoter(promoters[2]);

      if(user.leader){
        const  leaderData=await User.findById(user.leader)
          leaderData.leaderIncome += 2.5;
          leaderData.leaderIncomeHistory.push({
            amount: 2.5,
            category: "Rejoing Leaders income",
            basedOnWho: user.name,
            status: "Approved",
          });
          const updatedLeader=await leaderData.save();
          if(updatedLeader.leaderIncome>=10){
            const reciept= await sendUSDT(updatedLeader.walletAddress)
     if(reciept.status===1){
      await proceedToWithdraw(updatedLeader._id)
      updatedLeader.leaderIncome-=10;
      await updatedLeader.save();
     }
          }
        }

      user.joiningAmount -= 50;
      user.rejoiningWallet += 50;
      user.transactions.push({
        amount: -50,
        category: "Rejoing Amount",
        basedOnWho: user.name,
      });
      admin.rejoiningWallet += 50;
      admin.transactions.push({
        amount: 50,
        category: "Rejoing Amount",
        basedOnWho: user.name,
      });

      admin.autoPoolBank += 5;
      admin.rewards += 2.5;

      const updateAdmin = await admin.save();

      // Give $4 commission to sponsor as well as people above in the tree till 4 levels
      const sponser = await User.findById(user.sponser);

      // Code to add money to sponsor only
      if (sponser) {
        sponser.overallIncome += 12.5;
        sponser.transactions.push({
          amount: 12.5,
          category: "Rejoining sponsorship",
          basedOnWho: user.name,
        });
        const splitCommission =await payUser(12.5, sponser, sponser.lastWallet);

        sponser.earning = splitCommission.earning;
        sponser.joiningAmount = splitCommission.joining;
        sponser.rebirthAmount = splitCommission.rebirthAmount;
        sponser.totalWallet += splitCommission.addToTotalWallet;
        sponser.lastWallet = splitCommission.currentWallet;
        sponser.totalRebirthAmount = splitCommission.totalRebirthAmount;
        sponser.sponsorshipIncome += splitCommission.variousIncome;


        const updatedSponsor = await sponser.save();
            if(updatedSponsor){
              await awardCriteria(updatedSponsor)
             }

        if (user.nodeId) {
          
          const addCommission = await addCommissionToLine(user.nodeId, 7,user);

          const updatedUser = await user.save();

          if (updatedSponsor && updatedUser) {
            res
              .status(200)
              .json({ sts: "01", msg: "Plan upgraded successfully" });
          } else {
            res.status(400).json({ sts: "00", msg: "Plan upgrade failed" });
          }
        }
      } else {
        const updatedUser = await user.save();

        if (updatedUser && updateAdmin) {
          res
            .status(200)
            .json({ sts: "00", msg: "Plan upgraded successfully" });
        } else {
          res.status(400).json({ sts: "00", msg: "Plan upgrade failed" });
        }
      }
      // Code to add money to sponsor only end
    } else {
      res
        .status(400)
        .json({ sts: "00", msg: "Insufficient rejoining amount!" });
    }
  })
);

// Edit profile
router.put(
  "/edit-profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
          user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      // const token = jwt.sign(
      //   { userId: user._id },
      //   "secret_of_jwt_for_dreams-meta_5959",
      //   {
      //     expiresIn: "800d",
      //   }
      // );

      res.status(200).json({
        _id: updatedUser._id,
        sponser: updatedUser.sponser,
        name: updatedUser.name,
        email: updatedUser.email,
        ownSponserId: updatedUser.ownSponserId,
        earning: updatedUser.earning,
        joiningAmount: updatedUser.joiningAmount,
        autoPool: updatedUser.autoPool,
        autoPoolPlan: updatedUser.autoPoolPlan,
        autoPoolAmount: updatedUser.autoPoolAmount,
        userStatus: updatedUser.userStatus,
        isAdmin: updatedUser.isAdmin,
        children: updatedUser.children,
        // token_type: "Bearer",
        // access_token: token,
        sts: "01",
        msg: "Login Success",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Get all users under you (sponsored users)
router.get(
  "/get-users",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("children");
    const sponsors = user.children;

    if (user) {
      res.status(200).json(sponsors);
    } else {
      res.status(400).json({ sts: "00", msg: "Fetching data failed!" });
    }
  })
);

// Function to fetch users at a specific level for a given userId
async function 
getUsersAtLevel(userId, level) {
  const user = await User.findById(userId);
  if (!user) {
    return [];
  }

  const usersAtLevel = [];
  await findUsersAtLevel(user, level, 1, usersAtLevel);
  return usersAtLevel;
}

// Recursive function to traverse the binary tree and find users at a specific level
async function findUsersAtLevel(user, targetLevel, currentLevel, result) {
  if (!user || currentLevel > targetLevel) {
    return;
  }

  if (currentLevel == targetLevel) {
    result.push(user);
    return;
  }

  try {
    const leftUser = user.left ? await User.findById(user.left) : null;
    const rightUser = user.right ? await User.findById(user.right) : null;

    // Continue traversal
    await findUsersAtLevel(leftUser, targetLevel, currentLevel + 1, result);
    await findUsersAtLevel(rightUser, targetLevel, currentLevel + 1, result);
  } catch (error) {
    console.error(error);
  }
}

router.post(
  "/get-users-by-level",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { level } = req.body;

    const users = await getUsersAtLevel(userId, level);

    if (users) {
      res.status(200).json(users);
    } else {
      console.error(error);
      res.status(500).json({ sts: "00", msg: "Some error occured!" });
    }
  })
);

// Receive joining $50 from user
router.post(
  "/join",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { hash } = req.body;
    const user = await User.findById(userId);

    const joiningRequest = await JoiningRequest.create({
      user: userId,
      amount: 50,
      hash: hash,
      status: false,
    });

    if (joiningRequest) {
      if (user) {
        if (!user.joiningRequest) {
          user.joiningRequest = {};
        }

        user.joiningRequest = joiningRequest._id;

        const updateUser = await user.save();

        if (updateUser) {
          res.status(201).json({
            sts: "01",
            msg: "Your request has been sent successfully!",
          });
        }
      } else {
        res.status(400).json({
          sts: "00",
          msg: "User not found!",
        });
      }
    } else {
      res.status(400).json({
        sts: "00",
        msg: "Some error occured!",
      });
    }
  })
);

// Get user's joining request to user
router.get(
  "/get-joining-request",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("joiningRequest");

    if (user) {
      res.status(200).json(user.joiningRequest);
    } else {
      res.status(404).json({ sts: "00", msg: "User not found!" });
    }
  })
);

// Request for withdrawal
router.post(
  "/request-withdrawal",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { amount, walletAddress } = req.body;

    if (!amount || !walletAddress) {
      res.status(400).json({
        sts: "00",
        msg: "Please provide amount and wallet address!",
      });
    }

    const user = await User.findById(userId);

    if (user) {
      if (user.earning >= amount) {

        const currentReqState = user.requestCount.shift();

        if (currentReqState <= user.children.length) {
          const withdrawalRequest = await WithdrawRequest.create({
            user: userId,
            amount: amount,
            walletAddress: walletAddress,
            status: false,
            hash: "",
          });

          if (withdrawalRequest) {
            user.showWithdraw = false;
            const updatedUser = await user.save();
            if (updatedUser) {
              res.status(201).json({
                sts: "01",
                msg: "Your request has been sent successfully!",
              });
            } else {
              res.status(400).json({
                sts: "00",
                msg: "Some error occured!",
              });
            }
          } else {
            res.status(400).json({
              sts: "00",
              msg: "Some error occured!",
            });
          }
        } else {
          res.status(400).json({
            sts: "00",
            msg: "You don't have enough direct referrals!",
          });
        }
      } else {
        res.status(400).json({
          sts: "00",
          msg: "You don't have enough balance!",
        });
      }
    } else {
      res.status(400).json({
        sts: "00",
        msg: "User not found!",
      });
    }
  })
);

router.get(
  "/get-withdrawal-history",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userData = await User.findById( userId );

    if (userData) {
      res.status(200).json(userData.withdrawalHistory);
    } else {
      res.status(400).json({
        sts: "00",
        msg: "No withdrawal requests found!",
      });
    }
  })
);

// Manage payment to savings
router.post(
  "/manage-payment-to-savings",
  protect,
  asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
      res.status(400).json({ sts: "00", msg: "Invalid amount!" });
    }

    const user = await User.findById(req.user._id);

    if (amount && user) {
      const withdrawable = amount - amount * 0.05;

      // Add 10% to user's savings income
      if (!user.savingsIncome) {
        user.savingsIncome = withdrawable;
      } else {
        user.savingsIncome += withdrawable;
      }

      const admin = await User.findOne({ isAdmin: true });

      if (!admin.transactions) {
        admin.transactions = [
          {
            category: "adminCharge",
            amount: amount * 0.05,
            basedOnWho: user.name,
          },
        ];
      } else {
        admin.transactions.push({
          category: "adminCharge",
          amount: amount * 0.05,
          basedOnWho: user.name,
        });
      }

      user.earning -= amount;

      const updatedUser = await user.save();
      const updatedAdmin = await admin.save();

      if (updatedUser && updatedAdmin) {
        res.status(200).json({
          sts: "01",
          msg: "Added to savings successfully",
        });
      } else {
        res.status(400).json({ sts: "00", msg: "Savings not updated" });
      }
    } else {
      res.status(400).json({ sts: "00", msg: "No user or amount found" });
    }
  })
);

// Get all transactions
router.get(
  "/get-all-transactions",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user) {
      const transactions = user.transactions;
      if (transactions.length > 0) {
        res.status(200).json(transactions);
      } else {
        res.status(400).json({
          sts: "00",
          msg: "No transactions found!",
        });
      }
    } else {
      res.status(400).json({
        sts: "00",
        msg: "No transactions found!",
      });
    }
  })
);

router.get(
  "/get-all-admin-credits",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    try {
      const users = await User.aggregate([
        {
          $unwind: "$transactions",
        },
        {
          $sort: {
            "transactions.createdAt": -1,
          },
        },
        {
          $project: {
            name: "$transactions.name",
            amount: "$transactions.amount",
            category: "$transactions.category",
            basedOnWho: "$transactions.basedOnWho",
            createdAt: "$transactions.createdAt",
          },
        },
      ]);

      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(400).json({
          sts: "00",
          msg: "No transactions found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        sts: "01",
        msg: "Server error. Please try again later.",
        error: error.message,
      });
    }
  })
);

// Get all leader income history
router.get(
  "/get-all-leaderIncomeHistory",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user) {
      const transactions = user.leaderIncomeHistory;
      if (transactions.length > 0) {
        res.status(200).json(transactions);
      } else {
        res.status(400).json({
          sts: "00",
          msg: "No transactions found!",
        });
      }
    } else {
      res.status(400).json({
        sts: "00",
        msg: "No transactions found!",
      });
    }
  })
);


//get withdrawal history

router.get(
  "/get-withdrawal-History",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user) {
      const transactions = user.withdrawalHistory;
      if (transactions.length > 0) {
        res.status(200).json(transactions);
      } else {
        res.status(400).json({
          sts: "00",
          msg: "No transactions found!",
        });
      }
    } else {
      res.status(400).json({
        sts: "00",
        msg: "No transactions found!",
      });
    }
  })
);

//get all withdraw history by admin

router.get(
  "/get-all-withdraw-history",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    try {
      const users = await User.aggregate([
        {
          $unwind: "$withdrawalHistory",
        },
        {
          $sort: {
            "withdrawalHistory.createdAt": -1,
          },
        },
        {
          $project: {
            name: "$withdrawalHistory.name",
            amount: "$withdrawalHistory.amount",
            category: "$withdrawalHistory.category",
            createdAt: "$withdrawalHistory.createdAt",
          },
        },
      ]);

      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(400).json({
          sts: "00",
          msg: "No transactions found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        sts: "01",
        msg: "Server error. Please try again later.",
        error: error.message,
      });
    }
  })
);
// Get reward fileName
router.get(
  "/get-reward",
  protect,
  asyncHandler(async (req, res) => {
    const imageName = await Reward.findOne({ fixedValue: "ABC" }).select(
      "imageName"
    );

    if (imageName) {
      res.status(200).json(imageName);
    } else {
      res.status(400).json({ sts: "00", msg: "No file found" });
    }
  })
);

// Get all the users under a user
router.get(
  "/get-all-users-under-you",
  protect,
  asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const users = await fetchUsers(userId);

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ sts: "00", msg: "No users found" });
    }
  })
);

const fetchUsers = async (userId, users = []) => {
  const user = await User.findById(userId);

  if (!user) return users;

  users.push(user);

  if (user.left) await fetchUsers(user.left, users);
  if (user.right) await fetchUsers(user.right, users);

  return users;
};

export default router;
