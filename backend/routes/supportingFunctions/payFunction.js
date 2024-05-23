export const payUser = (amount, sponser, lastWallet) => {
  let earning = sponser.earning;
  let joining = sponser.joiningAmount;
  let totalWallet = sponser.totalWallet;
  let addToTotalWallet = 0;
  let variousIncome = 0;
  let currentWallet = lastWallet;
  
  // Loop until all amount is distributed
  while (amount > 0) {

    if (currentWallet === 'earning') {

      const spaceInEarning = 50 - (totalWallet % 50);

      const amountToAdd = Math.min(amount, spaceInEarning);
      earning += amountToAdd;
      totalWallet += amountToAdd;
      addToTotalWallet += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (totalWallet % 50 === 0) {
        currentWallet = 'joining';
      }
      
    } else {

      const spaceInJoining = 50 - (joining % 50);
      const amountToAdd = Math.min(amount, spaceInJoining);
      joining += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (joining % 50 === 0) {
        currentWallet = 'earning';
      }
      
    }

  }
  
  return { earning, joining, addToTotalWallet, currentWallet, variousIncome };
  
};



export const generatePromoterIncome = (amount, sponser, lastWallet) => {
  let earning = sponser.earning;
  let joining = sponser.joiningAmount;
  let totalWallet = sponser.totalWallet;
  let addToTotalWallet = 0;
  let variousIncome = 0;
  let currentWallet = lastWallet;
  
  // Loop until all amount is distributed
  while (amount > 0) {

    if (currentWallet === 'earning') {

      const spaceInEarning = 50 - (totalWallet % 50);

      const amountToAdd = Math.min(amount, spaceInEarning);
      earning += amountToAdd;
      totalWallet += amountToAdd;
      addToTotalWallet += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (totalWallet % 50 === 0) {
        currentWallet = 'joining';
      }
      
    } else {

      const spaceInJoining = 50 - (joining % 50);
      const amountToAdd = Math.min(amount, spaceInJoining);
      joining += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (joining % 50 === 0) {
        currentWallet = 'earning';
      }
      
    }

  }
  
  return { earning, joining, addToTotalWallet, currentWallet, variousIncome };
  
};