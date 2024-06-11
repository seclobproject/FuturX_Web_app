import express from "express";
import fs from "fs";
const fs1 = fs.promises;
const router = express.Router();

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";
import { bfsNew } from "./supportingFunctions/TreeFunctions.js";
import bcrypt from "bcryptjs";

import path from "path";
import multer from "multer";
import Reward from "../models/rewardModel.js";
import JoiningRequest from "../models/joinRequestModel.js";
import WithdrawRequest from "../models/withdrawalRequestModel.js";
import { awardCriteria, payUser } from "./supportingFunctions/payFunction.js";
import { log } from "console";

// router.get(
//   "/verify-user-payment",
//   protect,
//   asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     const user = await User.findById(userId).populate("sponser");
//     const admin = await User.findOne({
//       isAdmin: true,
//       // email: "peringammalasajeebkhan@gmail.com",
//     });

//     if (user.userStatus === true) {
//       res.status(400);
//       throw new Error("User already verified!");
//     }

//     if (user) {
//       // Approve the user
//       user.userStatus = true;

//       // Add $2 to Auto Pool bank of admin
//       if (admin.autoPoolBank) {
//         admin.autoPoolBank += 5;
//       } else {
//         admin.autoPoolBank = 5;
//       }

//       if (admin.rewards) {
//         admin.rewards += 2.5;
//       } else {
//         admin.rewards = 2.5;
//       }

//       await admin.save();

//       // Find the sponsor (If OgSponsor is not activated, he should be replaced by admin)
//       let sponser;

//       let splitCommission;

//       if (user.sponser) {
//         const ogSponser = user.sponser;

//         if (ogSponser.userStatus === true) {
//           // 'sponsor' is assigned as the original sponsor
//           sponser = user.sponser;

//           // Pushing the user to the sponsor's children array
//           if (!sponser.children.includes(user._id)) {
//             sponser.children.push(user._id);
//           }

//           // Adding $4 to the sponsor's earning
//           // if (!sponser.thirtyChecker) {
//           //   sponser.thirtyChecker = false;
//           // }

//           if (!sponser.joiningAmount) {
//             sponser.joiningAmount = 0;
//           }

//           if (!sponser.totalWallet) {
//             sponser.totalWallet = sponser.earning || 0;
//           }

//           if (!sponser.lastWallet) {
//             sponser.lastWallet = "earning";
//           }

//           if (!sponser.sponsorshipIncome) {
//             sponser.sponsorshipIncome = 0;
//           }

//           if (!sponser.overallIncome) {
//             sponser.overallIncome = 0;
//           }
//           sponser.overallIncome += 12.5;

//           if (
//             sponser.children.length >= 3 &&
//             sponser.currentPlan == "beginner"
//           ) {
//             sponser.currentPlan = "bronze";
//           } else if (
//             sponser.children.length >= 6 &&
//             sponser.currentPlan == "bronze"
//           ) {
//             sponser.currentPlan = "silver";
//           } else if (
//             sponser.children.length >= 12 &&
//             sponser.currentPlan == "silver"
//           ) {
//             sponser.currentPlan = "gold";
//           }else if (
//             sponser.children.length >= 24 &&
//             sponser.currentPlan == "gold"
//           ) {
//             sponser.currentPlan = "platinum";
//           }else if (
//             sponser.children.length >= 48 &&
//             sponser.currentPlan == "platinum"
//           ) {
//             sponser.currentPlan = "diamond";
//           }else if (
//             sponser.children.length >= 96 &&
//             sponser.currentPlan == "diamond"
//           ) {
//             sponser.currentPlan = "star";
//           }

//           if (!sponser.transactions) {
//             sponser.transactions = [];
//           }

//           sponser.transactions.push({
//             amount: 4,
//             category: "sponsorship",
//             basedOnWho: user.name,
//           });

//           splitCommission = payUser(12.5, sponser, sponser.lastWallet);

//           sponser.earning = splitCommission.earning;
//           sponser.joiningAmount = splitCommission.joining;
//           sponser.totalWallet += splitCommission.addToTotalWallet;
//           sponser.lastWallet = splitCommission.currentWallet;

//           // NOT necessory
//           sponser.sponsorshipIncome += splitCommission.variousIncome;
//           // NOT necessory
//         } else {
//           // If original sponsor is not verified, admin is assigned as the sponsor.
//           sponser = admin;
//           user.sponser = admin._id;
//           // Pushing the user to the sponser's children array
//           if (!sponser.children.includes(user._id)) {
//             sponser.children.push(user._id);
//           }

//           // Adding $4 to the sponsor's earning
//           // if (!sponser.thirtyChecker) {
//           //   sponser.thirtyChecker = false;
//           // }

//           if (!sponser.totalWallet) {
//             sponser.totalWallet = sponser.earning || 0;
//           }

//           if (!sponser.lastWallet) {
//             sponser.lastWallet = "earning";
//           }

//           if (!sponser.sponsorshipIncome) {
//             sponser.sponsorshipIncome = 0;
//           }

//           if (!sponser.overallIncome) {
//             sponser.overallIncome = 0;
//           }
//           sponser.overallIncome += 12.5;

//           if (
//             sponser.children.length >= 3 &&
//             sponser.currentPlan == "beginner"
//           ) {
//             sponser.currentPlan = "bronze";
//           } else if (
//             sponser.children.length >= 6 &&
//             sponser.currentPlan == "bronze"
//           ) {
//             sponser.currentPlan = "silver";
//           } else if (
//             sponser.children.length >= 12 &&
//             sponser.currentPlan == "silver"
//           ) {
//             sponser.currentPlan = "gold";
//           }else if (
//             sponser.children.length >= 24 &&
//             sponser.currentPlan == "gold"
//           ) {
//             sponser.currentPlan = "platinum";
//           }else if (
//             sponser.children.length >= 48 &&
//             sponser.currentPlan == "platinum"
//           ) {
//             sponser.currentPlan = "diamond";
//           }else if (
//             sponser.children.length >= 96 &&
//             sponser.currentPlan == "diamond"
//           ) {
//             sponser.currentPlan = "star";
//           }

//           if (!sponser.transactions) {
//             sponser.transactions = [];
//           }

//           sponser.transactions.push({
//             amount: 4,
//             category: "sponsorship",
//             basedOnWho: user.name,
//           });

//           // splitCommission = payUser(4, sponser, sponser.thirtyChecker);
//           splitCommission = payUser(12.5, sponser, sponser.lastWallet);

//           sponser.earning = splitCommission.earning;
//           sponser.joiningAmount = splitCommission.joining;
//           // sponser.thirtyChecker = splitCommission.checker;
//           sponser.totalWallet += splitCommission.addToTotalWallet;
//           sponser.lastWallet = splitCommission.currentWallet;

//           sponser.sponsorshipIncome += splitCommission.variousIncome;
//         }
//       }

//       const updateSponsor = await sponser.save();
//       // Assigning admin and giving direct referral amount finished

//       // If the sponsor attained 4 children, he should have auto-pool activated
//       if (sponser.children.length >= 4 && sponser.autoPool == false) {
//         sponser.autoPool = true;
//         // NOT NEEDED
//         sponser.autoPoolPlan = "starPossession";
//         // NOT NEEDED
//       }
//       // Auto pool finished

//       // Now assign the user to the tree
//       let updateTree;
//       if (updateSponsor) {
//         const left = "left";
//         const right = "right";
//         updateTree = await bfsNew(sponser, userId, left, right);
//       }
//       // Assign user to tree finished

//       if (updateTree) {
//         const attachedNode = updateTree.currentNodeId;
//         user.nodeId = attachedNode;

//         const updateSponsor = await sponser.save();
//         const updatedUser = await user.save();

//         if (updateSponsor && updatedUser) {
//           res.status(200).json({ sts: "01", message: "Success" });
//         } else {
//           res
//             .status(400)
//             .json({ sts: "00", msg: "Error occured while updating!" });
//         }
//       } else {
//         res.status(400).json({ msg: "Error assigning user to the tree" });
//       }
//     } else {
//       res.status(401).json({ msg: "User not found" });
//     }
//   })
// );

// Verify user payment by admin (for testing)
router.post(
  "/verify-user-payment-by-admin",
  protect,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const admin = await User.findOne({ isAdmin: true });
    const promoters = await User.find({ isPromoter: true });

    
    if (!user) {
      res.status(400);
      throw new Error("User Already exist !");
    }
    if (user.userStatus === true) {
      res.status(400);
      throw new Error("User already verified!");
    }
    
    let sponser=await User.findById(user.sponser);

    // Pushing the user to the sponsor's children array
    if (!sponser.children.includes(user._id)) {
      sponser.children.push(user._id);
    }else{
      res.status(400);
  throw new Error("This Child already exist in this User !");
    }
    const updatePromoter = async (promoter) => {
      console.log(promoter.name);
      promoter.leaderIncome += 2.5;
      promoter.leaderIncomeHistory.push({
        amount: 2.5,
        category: "promoters income",
        basedOnWho: user.name,
        status: "Approved",
      });
    
      try {
        await promoter.save();
        console.log("Promoter data saved successfully.");
      } catch (error) {
        console.error("Error saving Promoter data:", error);
      }
    };
    
    if (promoters.length >= 1) await updatePromoter(promoters[0]);
    if (promoters.length >= 2) await updatePromoter(promoters[1]);
    if (promoters.length >= 3) await updatePromoter(promoters[2]);

      // Approve the user
      user.userStatus = true;
      user.verifyStatus="active";
      admin.autoPoolBank += 5;
      admin.rewards += 2.5;
      await admin.save();

      // Find the sponser (If OgSponser is not activated, he should be replaced by admin)

      let splitCommission;

      
      if (sponser.userStatus === true) {
        console.log("entered in function");
          if(user.leader){
          const  leaderData=await User.findById(user.leader)
            console.log(leaderData);
            leaderData.leaderIncome += 2.5;
            leaderData.leaderIncomeHistory.push({
              amount: 2.5,
              category: "Leaders income",
              basedOnWho: user.name,
              status: "Approved",
            });
            await leaderData.save();
          }


          // Adding $12.5 to the sponsor's earning
          sponser.overallIncome += 12.5;

          // Rank based on overallIncome
          if (
            sponser.children.length >= 3 &&
            sponser.currentPlan == "beginner"
          ) {
            sponser.currentPlan = "bronze";
          } else if (
            sponser.children.length >= 6 &&
            sponser.currentPlan == "bronze"
          ) {
            sponser.currentPlan = "silver";
          } else if (
            sponser.children.length >= 12 &&
            sponser.currentPlan == "silver"
          ) {
            sponser.currentPlan = "gold";
          }else if (
            sponser.children.length >= 24 &&
            sponser.currentPlan == "gold"
          ) {
            sponser.currentPlan = "platinum";
          }else if (
            sponser.children.length >= 48 &&
            sponser.currentPlan == "platinum"
          ) {
            sponser.currentPlan = "diamond";
          }else if (
            sponser.children.length >= 96 &&
            sponser.currentPlan == "diamond"
          ) {
            sponser.currentPlan = "star";
          }
          // Rank based on overallIncome - END

          sponser.transactions.push({
            amount: 12.5,
            category: "sponsorship",
            basedOnWho: user.name,
          });

          // splitCommission = payUser(4, sponser, sponser.thirtyChecker);
          splitCommission =await payUser(12.5, sponser, sponser.lastWallet);
          console.log(splitCommission);

          console.log("leving pay user");
          sponser.earning = splitCommission.earning;
          sponser.joiningAmount = splitCommission.joining;
          sponser.rebirthAmount = splitCommission.rebirthAmount;
          // sponser.thirtyChecker = splitCommission.checker;
          sponser.totalWallet += splitCommission.addToTotalWallet;
          sponser.lastWallet = splitCommission.currentWallet;

          sponser.sponsorshipIncome += splitCommission.variousIncome;

          // const updatedSponser = await sponser.save();
        } else {
          console.log("reached in admin sponser");
          // If original sponsor is not verified, admin is assigned as the sponsor.
          user.sponser =  user.leader;

          if(user.leader){
            console.log(user.leader);
          const  leaderData=await User.findById(user.leader)
            console.log(leaderData);
            leaderData.leaderIncome += 2.5;
            leaderData.leaderIncomeHistory.push({
              amount: 2.5,
              category: "Leaders income history",
              basedOnWho: user.name,
              status: "Approved",
            });
            await leaderData.save();
          }
          // Pushing the user to the sponser's children array
          if (!sponser.children.includes(user._id)) {
            sponser.children.push(user._id);
          }

          sponser.overallIncome += 12.5;

          if (
            sponser.children.length >= 3 &&
            sponser.currentPlan == "beginner"
          ) {
            sponser.currentPlan = "bronze";
          } else if (
            sponser.children.length >= 6 &&
            sponser.currentPlan == "bronze"
          ) {
            sponser.currentPlan = "silver";
          } else if (
            sponser.children.length >= 12 &&
            sponser.currentPlan == "silver"
          ) {
            sponser.currentPlan = "gold";
          }else if (
            sponser.children.length >= 24 &&
            sponser.currentPlan == "gold"
          ) {
            sponser.currentPlan = "platinum";
          }else if (
            sponser.children.length >= 48 &&
            sponser.currentPlan == "platinum"
          ) {
            sponser.currentPlan = "diamond";
          }else if (
            sponser.children.length >= 96 &&
            sponser.currentPlan == "diamond"
          ) {
            sponser.currentPlan = "star";
          }

          sponser.transactions.push({
            amount: 12.5,
            category: "sponsorship",
            basedOnWho: user.name,
          });

          // splitCommission = payUser(4, sponser, sponser.thirtyChecker);
          splitCommission =await payUser(12.5, sponser, sponser.lastWallet);

          sponser.earning = splitCommission.earning;
          sponser.joiningAmount = splitCommission.joining;
          sponser.rebirthAmount = splitCommission.rebirthAmount;
          // sponser.thirtyChecker = splitCommission.checker;
          console.log(sponser.totalWallet);
          console.log(sponser.sponsorshipIncome);
          console.log(splitCommission.variousIncome);

          sponser.totalWallet += splitCommission.addToTotalWallet;
          sponser.sponsorshipIncome += splitCommission.variousIncome;
          sponser.lastWallet = splitCommission.currentWallet;

        }
      

  
       const updateSponsor = await sponser.save();

    if(updateSponsor){
     await awardCriteria(updateSponsor)
    }


      // Assigning admin and giving direct referral amount finished
      // If the sponsor attained 3 children, he should have auto-pool activated
      if (sponser.children.length >= 3 && sponser.autoPool == false) {
        sponser.autoPool = true;
        sponser.autoPoolPlan = "starPossession";
      }
      // Auto pool finished

      // Now assign the user to the tree

      let updateTree;
      if (updateSponsor) {
        const left = "left";
        const right = "right";
        updateTree = await bfsNew(sponser, userId, left, right);
      }
      // Assign user to tree finished

      if (updateTree) {
        const attachedNode = updateTree.currentNodeId;
        user.nodeId = attachedNode;

        const updateSponsor = await sponser.save();
        const updatedUser = await user.save();

        if (updateSponsor && updatedUser) {
          res.status(200).json({ sts: "01", message: "Success" });
        } else {
          res
            .status(400)
            .json({ sts: "00", msg: "Error occured while updating!" });
        }
      } else {
        res.status(400).json({ msg: "Error assigning user to the tree" });
      }
   
  })
);

// Delete user by admin
router.post(
  "/delete-user-by-admin",
  protect,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      const sponser = await User.findById(user.sponser);
      if (sponser) {
        // Remove user from sponsor's children array
        sponser.children = sponser.children.filter(
          (child) => child.toString() !== userId.toString()
        );
      }
      const updateSponsor = await sponser.save();

      // Remove user document
      const deleteUser = await User.findByIdAndDelete(userId);

      if (deleteUser) {
        res.status(200).json({ sts: "01", message: "Success" });
      } else {
        res.status(400).json({ msg: "Error occured while deleting!" });
      }
    }
  })
);

// GET all users to admin
router.get(
  "/get-users",
  protect,
  asyncHandler(async (req, res) => {
    const users = await User.find()
      .populate("sponser")
      .populate("joiningRequest");

    if (users) {
      res.json(users);
    }
  })
);

// Upload reward image
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

// Upload reward
router.post(
  "/upload-reward",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400).json({ msg: "No file uploaded" });
    }

    const existingFile = await Reward.findOne({ fixedValue: "ABC" });

    let image;
    if (existingFile) {
      existingFile.imageName = req.file.filename;
      image = await existingFile.save();
    } else {
      image = await Reward.create({
        imageName: req.file.filename,
      });
    }

    if (image) {
      res.status(200).json({ msg: "Upload success" });
    } else {
      res.status(400).json({ msg: "File upload failed" });
    }
  })
);

// Delete a reward
router.delete(
  "/delete-reward",
  protect,
  asyncHandler(async (req, res) => {
    const existingFile = await Reward.findOne();

    if (existingFile.imageName) {
      existingFile.imageName = null;
      const image = await existingFile.save();

      if (image) {
        res.status(200).json({ msg: "Deleted successfully" });
      } else {
        res.status(400).json({ msg: "Internal server error occured!" });
      }
    } else {
      res.status(400).json({ msg: "No rewards found" });
    }
  })
);

// PUT: Edit profile of any by admin
router.put(
  "/edit-profile",
  protect,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
console.log();
    const user = await User.findById(userId);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      console.log(req.body);

      if (req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      const token = jwt.sign(
        { userId: user._id },
        "secret_of_jwt_for_dreams-meta_5959",
        {
          expiresIn: "800d",
        }
      );

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
        token_type: "Bearer",
        access_token: token,
        sts: "01",
        msg: "Login Success",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET one user's details to admin by id
router.post(
  "/get-user-to-admin",
  protect,
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "User not found!" });
    }
  })
);

// Get all users in autopool
router.get(
  "/get-autopool-users",
  protect,
  asyncHandler(async (req, res) => {
    const users = await User.find({ autoPool: true });

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ sts: "00", msg: "No users found!" });
    }
  })
);

// Split autopool bonus based on the level
router.get(
  "/split-autopool-income",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const admin = await User.findById(userId);

    const users = await User.find({ autoPool: true });

    if (users.length <= 0) {
      res.status(400).json({ sts: "00", msg: "No users found!" });
    }

    if (users) {

      const autoPoolBalance = admin.autoPoolBank;
      let balanceUsed = 0;

      if (autoPoolBalance > 0) {
        // Distribute 10% of autopool among bronze users
        const promoterUsers = users.filter((user) => {
          return user.currentPlan === "bronze" || user.isPromoter === true;
        });

        if (promoterUsers.length > 0) {
          const fourtyPercent = autoPoolBalance * 0.1;

          const amountPerUserCalc = fourtyPercent / promoterUsers.length;

          const amountPerUser = Math.round(amountPerUserCalc * 100) / 100;

          for (const user of promoterUsers) {
            user.autoPoolAmount += amountPerUser;
            user.overallIncome += amountPerUser;
            // if (user.children.length >= 3 && user.currentPlan == "promoter") {
            //   user.currentPlan = "bronza";
            // }

            // Add amount to each user start
            const splitCommission =await payUser(
              amountPerUser,
              user,
              user.lastWallet
            );

            user.earning = splitCommission.earning;
            user.joiningAmount = splitCommission.joining;
            user.rebirthAmount = splitCommission.rebirthAmount;
            user.totalWallet += splitCommission.addToTotalWallet;
            user.lastWallet = splitCommission.currentWallet;
            user.sponsorshipIncome += splitCommission.variousIncome;
            // Add amount to each user end

            if (!user.transactions) {
              user.transactions = [
                {
                  category: "autoPool",
                  amount: amountPerUser,
                },
              ];
            } else {
              user.transactions.push({
                category: "autoPool",
                amount: amountPerUser,
              });
            }

          const updatedUser=  await user.save();
            if(updatedUser){
              await awardCriteria(updatedUser)
             }
          }

          balanceUsed += fourtyPercent;
        }

        // Distribute 20% of autoPoolBalance among silver users
        const royalAchieverUsers = users.filter((user) => {
          return user.currentPlan == "silver" || user.isPromoter === true;
        });

        if (royalAchieverUsers.length > 0) {
          const thirtyPercent = autoPoolBalance * 0.2;

          const amountPerUserCalc = thirtyPercent / royalAchieverUsers.length;

          const amountPerUser = Math.round(amountPerUserCalc * 100) / 100;

          for (const user of royalAchieverUsers) {
            user.autoPoolAmount += amountPerUser;
            user.overallIncome += amountPerUser;

            // if (
            //   user.overallIncome >= 250 &&
            //   user.currentPlan == "royalAchiever"
            // ) {
            //   user.currentPlan = "crownAchiever";
            // }

            // Add amount to each user start
            const splitCommission =await payUser(
              amountPerUser,
              user,
              user.lastWallet
            );

            user.earning = splitCommission.earning;
            user.joiningAmount = splitCommission.joining;
            user.rebirthAmount = splitCommission.rebirthAmount;
            user.totalWallet += splitCommission.addToTotalWallet;
            user.lastWallet = splitCommission.currentWallet;

            user.sponsorshipIncome += splitCommission.variousIncome;
            // Add amount to each user end

            if (!user.transactions) {
              user.transactions = [
                {
                  category: "autoPool",
                  amount: amountPerUser,
                },
              ];
            } else {
              user.transactions.push({
                category: "autoPool",
                amount: amountPerUser,
              });
            }

            const updatedUser= await user.save();
            if(updatedUser){
              await awardCriteria(updatedUser)
             }
          }

          balanceUsed += thirtyPercent;
        }

        // Distribute 20% of autoPoolBalance amoung gold users
        const crownAchieverUsers = users.filter((user) => {
          return user.currentPlan == "gold" || user.isPromoter === true;
        });

        if (crownAchieverUsers.length > 0) {
          const twentyPercent = autoPoolBalance * 0.2;

          // const fourtyPercent = autoPoolBalance * 0.2;
          console.log(`twentyPercent: ${twentyPercent}`);

          const amountPerUserCalc = twentyPercent / crownAchieverUsers.length;

          console.log(`amountPerUser: ${amountPerUserCalc}`);

          const amountPerUser = Math.round(amountPerUserCalc * 100) / 100;

          for (const user of crownAchieverUsers) {
            user.autoPoolAmount += amountPerUser;
            user.overallIncome += amountPerUser;

            // if (
            //   user.overallIncome >= 600 &&
            //   user.currentPlan == "crownAchiever"
            // ) {
            //   user.currentPlan = "diamondAchiever";
            // }

            // Add amount to each user start
            const splitCommission =await payUser(
              amountPerUser,
              user,
              user.lastWallet
            );

            user.earning = splitCommission.earning;
            user.joiningAmount = splitCommission.joining;
            user.rebirthAmount = splitCommission.rebirthAmount;
            user.totalWallet += splitCommission.addToTotalWallet;
            user.lastWallet = splitCommission.currentWallet;

            user.sponsorshipIncome += splitCommission.variousIncome;
            // Add amount to each user end

            if (!user.transactions) {
              user.transactions = [
                {
                  category: "autoPool",
                  amount: amountPerUser,
                },
              ];
            } else {
              user.transactions.push({
                category: "autoPool",
                amount: amountPerUser,
              });
            }

            const updatedUser=await user.save();
            if(updatedUser){
              await awardCriteria(updatedUser)
             }
          }

          balanceUsed += twentyPercent;
        }

        // Distribute 20% of autoPoolBalance amount platinum users
        const diamondAchieverUsers = users.filter((user) => {
          return user.currentPlan == "platinum" || user.isPromoter === true;
        });

        if (diamondAchieverUsers.length > 0) {
          const tenPercent = autoPoolBalance * 0.2;

          // const fourtyPercent = Math.round(autoPoolBalance * 0.1, 2);
          console.log(`tenPercent: ${tenPercent}`);

          const amountPerUserCalc = tenPercent / diamondAchieverUsers.length;

          console.log(`amountPerUser: ${amountPerUserCalc}`);

          const amountPerUser = Math.round(amountPerUserCalc * 100) / 100;

          console.log(`amountPerUserRounded: ${amountPerUser}`);

          for (const user of diamondAchieverUsers) {
            user.autoPoolAmount += amountPerUser;
            user.overallIncome += amountPerUser;

            // Add amount to each user start
            const splitCommission =await payUser(
              amountPerUser,
              user,
              user.lastWallet
            );

            user.earning = splitCommission.earning;
            user.joiningAmount = splitCommission.joining;
            user.rebirthAmount = splitCommission.rebirthAmount;
            user.totalWallet += splitCommission.addToTotalWallet;
            user.lastWallet = splitCommission.currentWallet;

            user.sponsorshipIncome += splitCommission.variousIncome;
            // Add amount to each user end

            if (!user.transactions) {
              user.transactions = [
                {
                  category: "autoPool",
                  amount: amountPerUser,
                },
              ];
            } else {
              user.transactions.push({
                category: "autoPool",
                amount: amountPerUser,
              });
            }

            const updatedUser=await user.save();
            if(updatedUser){
              await awardCriteria(updatedUser)
             }
          }

          balanceUsed += tenPercent;
        }

        // Distribute 20% of autoPoolBalance amount diamond users
        const diamondUsers = users.filter((user) => {
          return user.currentPlan == "diamond" || user.isPromoter === true;
        });

        if (diamondUsers.length > 0) {
          const tewentyPercent = autoPoolBalance * 0.2;

          // const fourtyPercent = Math.round(autoPoolBalance * 0.1, 2);
          console.log(`tenPercent: ${tewentyPercent}`);

          const amountPerUserCalc = tewentyPercent / diamondUsers.length;

          console.log(`amountPerUser: ${amountPerUserCalc}`);

          const amountPerUser = Math.round(amountPerUserCalc * 100) / 100;

          console.log(`amountPerUserRounded: ${amountPerUser}`);

          for (const user of diamondAchieverUsers) {
            user.autoPoolAmount += amountPerUser;
            user.overallIncome += amountPerUser;

            // Add amount to each user start
            const splitCommission =await payUser(
              amountPerUser,
              user,
              user.lastWallet
            );

            user.earning = splitCommission.earning;
            user.rebirthAmount = splitCommission.rebirthAmount;
            user.joiningAmount = splitCommission.joining;
            user.totalWallet += splitCommission.addToTotalWallet;
            user.lastWallet = splitCommission.currentWallet;

            user.sponsorshipIncome += splitCommission.variousIncome;
            // Add amount to each user end

            if (!user.transactions) {
              user.transactions = [
                {
                  category: "autoPool",
                  amount: amountPerUser,
                },
              ];
            } else {
              user.transactions.push({
                category: "autoPool",
                amount: amountPerUser,
              });
            }

            const updatedUser=await user.save();
            if(updatedUser){
              await awardCriteria(updatedUser)
             }
          }

          balanceUsed += tewentyPercent;
        }

        // Distribute 20% of autoPoolBalance amount platinum users
        const starAchieverUsers = users.filter((user) => {
          return user.currentPlan == "star" || user.isPromoter === true;
        });

        if (starAchieverUsers.length > 0) {
          const tenPercent = autoPoolBalance * 0.1;

          // const fourtyPercent = Math.round(autoPoolBalance * 0.1, 2);
          console.log(`tenPercent: ${tenPercent}`);

          const amountPerUserCalc = tenPercent / starAchieverUsers.length;

          console.log(`amountPerUser: ${amountPerUserCalc}`);

          const amountPerUser = Math.round(amountPerUserCalc * 100) / 100;

          console.log(`amountPerUserRounded: ${amountPerUser}`);

          for (const user of diamondAchieverUsers) {
            user.autoPoolAmount += amountPerUser;
            user.overallIncome += amountPerUser;

            // Add amount to each user start
            const splitCommission =await payUser(
              amountPerUser,
              user,
              user.lastWallet
            );

            user.earning = splitCommission.earning;
            user.rebirthAmount = splitCommission.rebirthAmount;
            user.joiningAmount = splitCommission.joining;
            user.totalWallet += splitCommission.addToTotalWallet;
            user.lastWallet = splitCommission.currentWallet;

            user.sponsorshipIncome += splitCommission.variousIncome;
            // Add amount to each user end

            if (!user.transactions) {
              user.transactions = [
                {
                  category: "autoPool",
                  amount: amountPerUser,
                },
              ];
            } else {
              user.transactions.push({
                category: "autoPool",
                amount: amountPerUser,
              });
            }

            const updatedUser=await user.save();
            if(updatedUser){
              await awardCriteria(updatedUser)
             }
          }

          balanceUsed += tenPercent;
        }

        admin.autoPoolBank -= balanceUsed;

        // Reset autopool bank amount
        if (admin.autoPoolBank > 0) {
          admin.autoPoolBank = 0;
        }

        const updatedUser = await admin.save();

        if (updatedUser) {
          res
            .status(200)
            .json({ msg: "AutoPool bonus distributed successfully" });
        } else {
          res
            .status(400)
            .json({ sts: "00", msg: "Error distributing autopool" });
        }
      } else {
        res.status(400).json({
          msg: "You don't have enough balance in autopool bank to distribute",
        });
      }
    } else {
      res.status(400).json({ sts: "00", msg: "No user found!" });
    }
  })
);

// GET: Auto pool income
router.get(
  "/get-autopool-income",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const admin = await User.findById(userId);

    if (admin) {
      res.status(200).json({
        autoPoolAmount: admin.autoPoolBank,
      });
    } else {
      res.status(400).json({ sts: "00", msg: "No admin user found" });
    }
  })
);

// GET: Get the total amount received by admin to rejoining wallet
router.get(
  "/get-rejoining-wallet",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const admin = await User.findById(userId);

    if (admin) {
      res.status(200).json({
        rejoiningWallet: admin.rejoiningWallet,
      });
    } else {
      res.status(400).json({ sts: "00", msg: "No admin user found" });
    }
  })
);

// GET all joining requests to admin
router.get(
  "/get-joining-requests",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const requests = await JoiningRequest.find().populate("user");

    if (requests) {
      res.status(200).json({
        sts: "01",
        msg: "Success",
        requests,
      });
    } else {
      res.status(400).json({ sts: "00", msg: "No requests found" });
    }
  })
);

// Get all withdrawal requests
router.get(
  "/get-withdrawal-requests",
  protect,
  asyncHandler(async (req, res) => {
    const withdrawalRequests = await WithdrawRequest.find().populate("user");

    if (withdrawalRequests) {
      res.status(200).json(withdrawalRequests);
    } else {
      res.status(400).json({ sts: "00", msg: "No withdrawal requests found" });
    }
  })
);

// Post: Accept/Reject withdrawal request
router.post(
  "/manage-withdrawal-request",
  protect,
  asyncHandler(async (req, res) => {
    const { requestId, action, hash } = req.body;

    if (!requestId || !action) {
      res
        .status(400)
        .json({ sts: "00", msg: "Please send request id and action" });
    }

    const request = await WithdrawRequest.findById(requestId);
    const user = await User.findById(request.user);

    if (request) {
      request.status = action;
      request.hash = hash;

      user.earning -= request.amount;

      const updatedRequest = await request.save();
      const updatedUser = await user.save();

      if (updatedRequest && updatedUser) {
        res.status(200).json({
          sts: "01",
          msg: "Request updated successfully",
        });
      } else {
        res.status(400).json({ sts: "00", msg: "Request not updated" });
      }
    } else {
      res.status(400).json({ sts: "00", msg: "No request found" });
    }
  })
);

// Manage payment send
router.post(
  "/manage-payment-send",
  protect,
  asyncHandler(async (req, res) => {
    const { requestId } = req.body;

    if (!requestId) {
      res.status(400).json({ sts: "00", msg: "Please send request id" });
    }
   console.log(requestId);
    const request = await WithdrawRequest.findById(requestId).populate("user");

    const admin = await User.findById(req.user._id);

    if (request) {
      const getUser = request.user;
      const userId = getUser._id;

      const user = await User.findById(userId);

      const amount = request.amount;
      const withdrawable = amount - amount * 0.15;

      // Add 10% to user's savings income
      if (!user.savingsIncome) {
        user.savingsIncome = amount * 0.1;
      } else {
        user.savingsIncome += amount * 0.1;
      }

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

      request.status = true;

      user.earning -= amount;
      user.showWithdraw = true;

      const updatedRequest = await request.save();
      const updatedUser = await user.save();
      const updatedAdmin = await admin.save();

      if (updatedRequest && updatedUser && updatedAdmin) {
        res.status(200).json({
          sts: "01",
          msg: "Request updated successfully",
        });
      } else {
        res.status(400).json({ sts: "00", msg: "Request not updated" });
      }
    } else {
      res.status(400).json({ sts: "00", msg: "No request found" });
    }
  })
);

// Edit profile
router.put(
  "/edit-profile-by-admin",
  protect,
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const user = await User.findById(id);

    if (user) {
      user.earning = req.body.earning ?? user.earning;

      user.joiningAmount = req.body.joiningAmount ?? user.joiningAmount;

      user.lastWallet = req.body.lastWallet ?? user.lastWallet ?? "earning";

      user.totalWallet = req.body.totalWallet ?? user.totalWallet ?? 0;

      user.generationIncome =
        req.body.generationIncome ?? user.generationIncome ?? 0;

      user.sponsorshipIncome =
        req.body.sponsorshipIncome ?? user.sponsorshipIncome ?? 0;

      user.overallIncome = req.body.overallIncome ?? user.overallIncome ?? 0;

      user.name = req.body.name ?? user.name;

      user.email = req.body.email ?? user.email;

      user.autoPool = req.body.autoPool ?? user.autoPool;

      user.autoPoolAmount = req.body.autoPoolAmount ?? user.autoPoolAmount ?? 0;

      user.currentPlan = req.body.currentPlan ?? user.currentPlan;
console.log(req.body.password);
      if (req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        user.password = hashedPassword;
      }


      const updatedUser = await user.save();

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
        sts: "01",
        msg: "Login Success",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Get the total amount needed inorder to know the amount to be given to the users
router.get(
  "/get-total-amount",
  protect,
  asyncHandler(async (req, res) => {
    const totalEarning = await User.aggregate([
      {
        $match: {
          earning: { $exists: true },
        },
      },
      {
        $group: {
          _id: null,
          totalEarning: { $sum: "$earning" },
        },
      },
    ]);

    const totalSaving = await User.aggregate([
      {
        $match: {
          savingsIncome: { $exists: true },
        },
      },
      {
        $group: {
          _id: null,
          totalEarning: { $sum: "$savingsIncome" },
        },
      },
    ]);

    // Get total autopool bank amount required
    const admin = await User.findById(req.user._id);
    const totalAutoPoolBank = admin.autoPoolBank;
    const rewards = admin.rewards;

    if (totalEarning) {
      const earningSum = totalEarning[0].totalEarning;
      const savingSum = totalSaving[0].totalSaving;
      res
        .status(200)
        .json({ earningSum, totalAutoPoolBank, rewards, savingSum });
    } else {
      res.status(400).json({ sts: "00", msg: "No earning found" });
    }
  })
);

export default router;
