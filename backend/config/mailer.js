import nodemailer from "nodemailer";

const CLIENT_ID = "futurxglobal@gmail.com";
const CLIENT_SECRET = "kurl xrzc pdeo tdbt";
const url="https://futurx.vip"

export const sendMail = (mailId, name, sponserid, password) => {
  const recipient = mailId;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: CLIENT_ID,
      pass: CLIENT_SECRET,
    },
  });
  const mailOptions = {
    from: `FUTURX GROUP <futurxglobal@gmail.com>`,
    to: `${recipient}`,
    subject: `Hi ${name}, Registration successful.`,
    text: `Hi ${name}, Welcome to FUTUR X`,
    html: `<h4>Congrats! You have joined the FUTUR X Group.</h4><p>Your sponserID is <strong>${sponserid}</strong><br/>Username: ${recipient}<br />Password: ${password}</p></p><p>You have successfully got the 10 digital visiting cards when you give 50$.</p><br />Website: <a href="${url}">${url}</a></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:-", info.response);
    }
  });
};
