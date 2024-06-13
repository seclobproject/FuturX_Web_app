import User from "../../models/userModel.js";
import { awardCriteria, payUser } from "./payFunction.js";

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
    // NOT NEEDED
    const sponser = await User.findById(newUserId);
    // NOT NEEDED

    // Add commission to everyone in line up to 6 levels above
    await addCommissionToLine(currentNode._id, 6,sponser);

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
  newUser
) => {
  let currentUserId = startingUserId;
  let currentLevel = 0;

  let commissionAmount = [4,4,3,3,2,2,2];

  while (currentLevel <= levelsAbove) {

    if (!currentUserId) {
     const arrayBalanceAmount = commissionAmount.reduce((sum, value) => sum + value, 0);
      console.log("company total commission",commissionAmount);
      console.log(arrayBalanceAmount);
      const company=await User.findOne({isPromoter:true})
      company.levelBalance+=arrayBalanceAmount;
      company.leaderIncomeHistory.push({
        amount: arrayBalanceAmount,
        category: "Level Balance income",
        status: "Approved",
      });
      const updatedLeader=await company.save()
      if(updatedLeader.levelBalance>=10){
        const reciept= await sendUSDT(updatedLeader.walletAddress)
 if(reciept.status===1){
  await proceedToWithdraw(updatedLeader._id)
  updatedLeader.levelBalance-=10;
  await updatedLeader.save();
 }
      }
      break;
    }
    
    const currentUser = await User.findById(currentUserId);

    console.log("parent names",currentUser.name);
    
    if (newUser._id===currentUserId) {
      console.log("-------------------------same id------------------------------");
       currentUserId = currentUser.nodeId;
       continue;
     }

     console.log("company commission",commissionAmount);

    // const commissionToAdd = commissionAmount;
    const commissionToAdd = commissionAmount.shift();
    let splitCommission;
    console.log("by one commission",commissionToAdd);

    currentUser.overallIncome += commissionToAdd;
    
    currentUser.levelIncome += commissionToAdd;

    // Add to transactions history

    currentUser.transactions.push({
      amount: commissionToAdd,
      category: "levelIncome",
      basedOnWho:newUser.name
    });

    // splitCommission = payUser(commissionToAdd, currentUser, currentUser.thirtyChecker);
    splitCommission =await payUser(
      commissionToAdd,
      currentUser,
      currentUser.lastWallet
    );

    currentUser.earning = splitCommission.earning;
    currentUser.joiningAmount = splitCommission.joining;
    currentUser.rebirthAmount = splitCommission.rebirthAmount;
    // currentUser.thirtyChecker = splitCommission.checker;
    currentUser.totalWallet += splitCommission.addToTotalWallet;
    currentUser.lastWallet = splitCommission.currentWallet;
    currentUser.generationIncome += splitCommission.variousIncome;

    // Save the updated user to the database
    const updatedUser=await currentUser.save();
    if(updatedUser){
     await awardCriteria(updatedUser)
    }
    if(updatedUser.rejoiningWallet%50){
      
    }

    // Move to the parent of the current user
    currentUserId = currentUser.nodeId;
    currentLevel++;
  }
};
