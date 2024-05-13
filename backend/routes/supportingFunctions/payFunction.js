export const payUser = (amount, sponser, lastWallet) => {

  console.log('reached here 007');
  
  let earning = sponser.earning;
  let joining = sponser.joiningAmount;
  let totalWallet = sponser.totalWallet;
  let addToTotalWallet = 0;
  let variousIncome = 0;
  let currentWallet = lastWallet;
  
  // Loop until all amount is distributed
  while (amount > 0) {

    if (currentWallet === 'earning') {
      
      const spaceInEarning = 30 - (totalWallet % 30);
      const amountToAdd = Math.min(amount, spaceInEarning);
      earning += amountToAdd;
      totalWallet += amountToAdd;
      addToTotalWallet += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (totalWallet % 30 === 0) {
        currentWallet = 'joining';
      }
      
    } else {
      
      const spaceInJoining = 30 - (joining % 30);
      const amountToAdd = Math.min(amount, spaceInJoining);
      joining += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (joining % 30 === 0) {
        currentWallet = 'earning';
      }
      
    }
  }
  
  return { earning, joining, addToTotalWallet, currentWallet, variousIncome };
  
};
