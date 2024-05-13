import bcrypt from "bcryptjs";

const users = [
  {
    sponser: null,
    name: "Super Admin",
    email: "seclobclt@gmail.com",
    password: "pass123",
    isAdmin: true,
    ownSponserId: "7hhmKA1",
    earning: 0,
    transactions: [],
    userStatus: true,
    children: [],
    currentPlan: "promoter",
    autoPool: false,
    joiningAmount: 0,
    requestCount: [0, 1, 2, 3, 4]
  },
];

export default users;
