import bcrypt from "bcryptjs";

const users = [
  {
    sponser: null,
    name: "Super Admin",
    email: "futurx@gmail.com",
    password: bcrypt.hashSync("pass123", 10),
    isAdmin: true,
    ownSponserId: "FX155465",
    earning: 0,
    transactions: [],
    userStatus: true,
    children: [],
    currentPlan: "beginner",
    autoPool: false,
    joiningAmount: 0,
    requestCount: [0, 1, 2, 3, 4]
  },
  {
    sponser: null,
    name: "Company",
    email: "company@gmail.com",
    password: bcrypt.hashSync("pass123", 10),
    isAdmin: false,
    isPromoter: true,
    ownSponserId: "FX987522",
    earning: 0,
    transactions: [],
    userStatus: true,
    children: [],
    currentPlan: "beginner",
    autoPool: true,
    joiningAmount: 0,
    requestCount: [0, 1, 2, 3, 4]
  },
  {
    sponser: null,
    name: "Company Owner 1",
    email: "companyowner1@gmail.com",
    password: bcrypt.hashSync("pass123", 10),
    isAdmin: false,
    isPromoter: true,
    ownSponserId: "FX366548",
    earning: 0,
    transactions: [],
    userStatus: true,
    children: [],
    currentPlan: "beginner",
    autoPool: true,
    joiningAmount: 0,
    requestCount: [0, 1, 2, 3, 4]
  },
  {
    sponser: null,
    name: "Company Owner 2",
    email: "companyowner2@gmail.com",
    password: bcrypt.hashSync("pass123", 10),
    isAdmin: false,
    isPromoter: true,
    ownSponserId: "FX585656",
    earning: 0,
    transactions: [],
    userStatus: true,
    children: [],
    currentPlan: "beginner",
    autoPool: true,
    joiningAmount: 0,
    requestCount: [0, 1, 2, 3, 4]
  },

];

export default users;
