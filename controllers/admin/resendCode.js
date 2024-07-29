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
// SubmitCode method for submiting the code that has been send to the user email address
const resendCode = async (req, res) => {
    try {
        const admin = await Admin.findById({ _id: req.user._id });
        if(admin.is_verified === true) 
            return sendResponse(res, 400, req.lang.cAdminAlreadyVerified);

        const codeObj = await Code.findOne({ _adminID: req.user._id });
        const generatedCode = Math.floor(Math.random()*90000) + 10000;
        const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
        const code = await bcrypt.hash(String(generatedCode), salt);
        if(codeObj) {
            await Code.findOneAndDelete({ _adminID: req.user._id });
        }
        await new Code({ _adminID: admin._id, code: code }).save();
        const mail = { mailService: process.env.SYSTEM_SERVICE_NODEMAILER, mailHost: process.env.SYSTEM_HOST_NODEMAILER, mailPort: Number(process.env.SYSTEM_PORT_NODEMAILER), mailAddress: process.env.SYSTEM_EMAIL_NODEMAILER, mailPassword: process.env.SYSTEM_PASS_NODEMAILER }
        const content = { subject: "Email Verification", title: "Hospital System", message: ` Your Code is ${generatedCode}. Note that the code is only valid for 24 hours.` }
        await sendEmail(mail, admin, content);
        return sendResponse(res, 200, req.lang.cCodeResend);
    } catch (err) {
        console.log(err.message)
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Export SubmitCode
module.exports = resendCode;