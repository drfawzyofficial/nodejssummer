// JS Strict Mode
"use strict";

const nodemailer = require("nodemailer");
const sendEmail = async (mail, user, content) => {
  let transporter = nodemailer.createTransport({
    service: mail.mailService,
    host: mail.mailHost,
    port: mail.mailPort,
    // secure: true,
    auth: {
      user: mail.mailAddress,
      pass: mail.mailPassword
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: mail.mailAddress,
    to: user.email,
    subject: content.subject,
    html: `
        <h2>${ content.title }</h2>
        <h3> How are you? We hope that you are fine today </h3>
        <p>${ content.message }</p>
       
    `,
  };
  await transporter.sendMail(mailOptions);

};
module.exports = sendEmail;
