import User from "../../models/userModel.js";
import { payUser } from "./payFunction.js";

export const bfsNew = async (startingUser, newUserId, left, right) => {
  // Check if startingUser is null. If so, we don't need to run this function any more. The user is placed on the tree.
  if (!startingUser) {
    return null;
  }

  // Else, we will create a queue to store the users that need to be checked.
  // The starting user at first will be the admin or the sponsor(if the sponsor is verified)
  const queue = [startingUser];

  while (queue.length > 0) {
    // Get the first user in the queue (the user added to the array at first).
    const currentNode = queue.shift();

    // Determine the direction to add the new user. We are adding users from left to right.
    // So the first direction will be left.
    let directionToAdd = left;

    // If the current node has no left, we will add the user to the left.
    if (!currentNode.left) {
      directionToAdd = left;

      // If the current node has no right, we will add the user to the right.
    } else if (!currentNode.right) {
      directionToAdd = right;

      // If the current node has both left and right filled, we will move to the next level.
    } else {
      if (currentNode.left) {
        queue.push(await User.findById(currentNode.left));
      }
      if (currentNode.right) {
        queue.push(await User.findById(currentNode.right));
      }
      continue;
    }

    // Try to add the new user in the determined direction.
    // 'directionToAdd' will have either 'left' or 'right'.
    await User.findByIdAndUpdate(currentNode._id, {
      [directionToAdd]: newUserId,
    });

    // Get sponsor ID to avoid from adding commission twice
    const sponser = await User.findById(newUserId);
    const sponserId = sponser.sponser;

    // Add commission to everyone in line up to 4 levels above
    await addCommissionToLine(currentNode._id, 3, 4);

    return {
      currentNodeId: currentNode._id,
      directionAdded: directionToAdd,
    };
  }

  throw new Error("Unable to assign user to the tree");
};

// Function to add commission to everyone in line up to specified levels above
export const addCommissionToLine = async (
  startingUserId,
  levelsAbove,
  commissionAmount
) => {
  let currentUserId = startingUserId;
  let currentLevel = 0;

  while (currentUserId && currentLevel <= levelsAbove) {
    if (!currentUserId) {
      break;
    }

    const currentUser = await User.findById(currentUserId);

    const commissionToAdd = commissionAmount;

    let splitCommission;

    // if (!currentUser.thirtyChecker) {
    //   currentUser.thirtyChecker = false;
    // }

    if (!currentUser.totalWallet) {
      currentUser.totalWallet = currentUser.earning || 0;
    }

    if (!currentUser.joiningAmount) {
      currentUser.joiningAmount = 0;
    }

    if (!currentUser.lastWallet) {
      currentUser.lastWallet = "earning";
    }

    if (!currentUser.generationIncome) {
      currentUser.generationIncome = 0;
    }

    if (!currentUser.overallIncome) {
      currentUser.overallIncome = 0;
    }

    currentUser.overallIncome += 4;

    if (
      currentUser.overallIncome >= 100 &&
      currentUser.currentPlan == "promoter"
    ) {
      currentUser.currentPlan = "royalAchiever";
    } else if (
      currentUser.overallIncome >= 250 &&
      currentUser.currentPlan == "royalAchiever"
    ) {
      currentUser.currentPlan = "crownAchiever";
    } else if (
      currentUser.overallIncome >= 600 &&
      currentUser.currentPlan == "crownAchiever"
    ) {
      currentUser.currentPlan = "diamondAchiever";
    }

    // Add to transactions history

    if (!currentUser.transactions) {
      currentUser.transactions = [];
    }
    currentUser.transactions.push({
      amount: 4,
      category: "levelIncome",
    });

    // splitCommission = payUser(commissionToAdd, currentUser, currentUser.thirtyChecker);
    splitCommission = payUser(
      commissionToAdd,
      currentUser,
      currentUser.lastWallet
    );

    currentUser.earning = splitCommission.earning;
    currentUser.joiningAmount = splitCommission.joining;
    // currentUser.thirtyChecker = splitCommission.checker;
    currentUser.totalWallet += splitCommission.addToTotalWallet;
    currentUser.lastWallet = splitCommission.currentWallet;
    currentUser.generationIncome += splitCommission.variousIncome;

    // Save the updated user to the database
    await currentUser.save();

    // Move to the parent of the current user
    currentUserId = currentUser.nodeId;
    currentLevel++;
  }
};

// Function to add commission to everyone in line up while level upgrade
// export const addCommissionToLineForUpgrade = async (
//   startingUserId,
//   levelsAbove,
//   commissionAmount
// ) => {
//   let currentUserId = startingUserId;
//   let currentLevel = 0;

//   while (currentUserId && currentLevel <= levelsAbove) {
//     if (!currentUserId) {
//       break;
//     }
//     const currentUser = await User.findById(currentUserId);

//     const commissionToAdd = commissionAmount;

//     if (!currentUser.thirtyChecker) {
//       currentUser.thirtyChecker = false;
//     }

//     if (!currentUser.totalWallet) {
//       currentUser.totalWallet = currentUser.earning || 0;
//     }

//     const levelIncome = splitterTest(
//       commissionToAdd,
//       currentUser,
//       currentUser.thirtyChecker,
//       currentUser.currentPlan
//     );
//     currentUser.earning = levelIncome.earning;
//     currentUser.joiningAmount = levelIncome.joining;
//     currentUser.thirtyChecker = levelIncome.checker;

//     if (currentUser.currentPlan == "promoter") {
//       currentUser.totalWallet = Math.min(
//         30,
//         currentUser.totalWallet + levelIncome.addToTotalWallet
//       );
//     } else if (currentUser.currentPlan == "royalAchiever") {
//       currentUser.totalWallet = Math.min(
//         90,
//         currentUser.totalWallet + levelIncome.addToTotalWallet
//       );
//     } else if (currentUser.currentPlan == "crownAchiever") {
//       currentUser.totalWallet = Math.min(
//         90,
//         currentUser.totalWallet + levelIncome.addToTotalWallet
//       );
//     } else if (currentUser.currentPlan == "diamondAchiever") {
//       currentUser.totalWallet = Math.min(
//         90,
//         currentUser.totalWallet + levelIncome.addToTotalWallet
//       );
//     }

//     // Save the updated user to the database
//     await currentUser.save();

//     // Move to the parent of the current user
//     currentUserId = currentUser.nodeId;
//     currentLevel++;
//   }
// };

// export const splitterTest = (number, sponser, checker, plan) => {
//   let totalWallet = sponser.totalWallet;

//   let addToTotalWallet = 0;

//   let earningThreshold;
//   let joiningThreshold;

//   // if (plan == "promoter") {
//   //   earningThreshold = 30;
//   //   joiningThreshold = 60;
//   // } else if (plan == "royalAchiever") {
//   //   earningThreshold = 60;
//   //   joiningThreshold = 100;
//   // } else if (plan == "crownAchiever") {
//   //   earningThreshold = 100;
//   //   joiningThreshold = 200;
//   // } else if (plan == "diamondAchiever") {
//   //   earningThreshold = 200;
//   //   joiningThreshold = 200;
//   // }

//   if (totalWallet <= 30) {
//     earningThreshold = 30;
//     joiningThreshold = 60;
//   } else if (totalWallet <= 90) {
//     earningThreshold = Math.min(90, 90 - totalWallet);
//     joiningThreshold = 100;
//   } else if (totalWallet <= 190) {
//     earningThreshold = Math.min(190, 190 - totalWallet);
//     joiningThreshold = 200;
//   } else if (totalWallet >= 390) {
//     earningThreshold = 200;
//     joiningThreshold = 200;
//   }

//   let earning = sponser.earning;
//   let joining = sponser.joiningAmount;

//   let remainingEarningSpace;
//   let remainingJoiningSpace;

//   if (sponser.currentPlan == "promoter") {
//     remainingEarningSpace = earningThreshold - earning;
//   } else {
//     remainingEarningSpace = earningThreshold;
//   }

//   remainingJoiningSpace = joiningThreshold - joining;
//   // const remainingEarningSpace = earningThreshold - earning;

//   // Add to earning first
//   if (remainingEarningSpace > 0 && number > 0 && checker === false) {
//     const earningToAdd = Math.min(remainingEarningSpace, number);
//     addToTotalWallet += earningToAdd;
//     earning += earningToAdd;
//     number -= earningToAdd;

//     if (earning >= earningThreshold) {
//       checker = true;
//     }
//   }

//   // Add to joining
//   if (remainingJoiningSpace > 0 && number > 0 && checker === true) {
//     const joiningToAdd = Math.min(remainingJoiningSpace, number);
//     joining += joiningToAdd;
//     number -= joiningToAdd;

//     if (joining >= joiningThreshold) {
//       checker = false;
//     }
//   }

//   // Add remaining to earning
//   if (number > 0) {
//     earning += number;
//   }

//   return { earning, joining, checker, addToTotalWallet };
// };
