// JS Strict Mode
"use strict";

// Import Packages
const bcrypt = require("bcryptjs");

// Import Models
const Admin = require('../../models/Admin');
const Code = require('../../models/Code');

// Import Utils 
const sendResponse = require('../../utils/sendResponse');
const sendEmail = require('../../utils/sendEmail');

// adminCreate method for creating a admin
const adminSignup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const admin = await new Admin({ fullname, email, password }).save();



        const generatedCode = Math.floor(Math.random()*90000) + 10000;

        const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));

        const code = await bcrypt.hash(String(generatedCode), salt);

        await new Code({ _adminID: admin._id, code: code }).save();


        
        const mail = { mailService: process.env.SYSTEM_SERVICE_NODEMAILER, mailHost: process.env.SYSTEM_HOST_NODEMAILER, mailPort: Number(process.env.SYSTEM_PORT_NODEMAILER), mailAddress: process.env.SYSTEM_EMAIL_NODEMAILER, mailPassword: process.env.SYSTEM_PASS_NODEMAILER }


        const content = { subject: "Email Verification", title: "NodeJS Summer Training", message: ` Your Code is ${generatedCode}. Note that the code is only valid for 24 hours.` }


        await sendEmail(mail, admin, content);


        const result = { admin: admin }

        
        return sendResponse(res, 201, "Account has been created Successfully", result);

    } catch (err) {
        console.log(err.message)
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Export adminCreate
module.exports = adminSignup;