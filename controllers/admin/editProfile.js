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

// editProfile Controller for editing admin profile data
const editProfile = async (req, res) => {
    try {
        
        const admin = await Admin.findOne({ _id: req.user._id });

        const foundedEmail = await Admin.findOne({email: req.body.email, _id: {$ne: admin._id }});
        if(foundedEmail) {
            return sendResponse(res, 400, 'There is another admin that has this email')
        }

        // if the sent email is not identical to the admin email, 
        if(req.body.email !== admin.email) {
            const codeObj = await Code.findOne({ _adminID: req.user._id });
            const generatedCode = Math.floor(Math.random()*90000) + 10000;
            const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
            const code = await bcrypt.hash(String(generatedCode), salt);
            if(codeObj) {
                await Code.findOneAndDelete({ _adminID: req.user._id });
            }
            await new Code({ _adminID: admin._id, code: code }).save();
            const mail = { mailService: process.env.SYSTEM_SERVICE_NODEMAILER, mailHost: process.env.SYSTEM_HOST_NODEMAILER, mailPort: Number(process.env.SYSTEM_PORT_NODEMAILER), mailAddress: process.env.SYSTEM_EMAIL_NODEMAILER, mailPassword: process.env.SYSTEM_PASS_NODEMAILER }
            const user = { email: req.body.email }
            const content = { subject: "Email Verification", title: "Hospital System", message: ` Your Code is ${generatedCode}. Note that the code is only valid for 24 hours.` }
            await sendEmail(mail, user, content);
        }
        let is_verified = req.body.email !== admin.email? false : admin.is_verified;
        const { gender, age, dOB, fullname, email, bio, contactInfo } = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate({ _id: req.user._id }, {
            gender, age, dOB, fullname, email, is_verified, bio, contactInfo
        }, { new: true });

        return sendResponse(res, 200, req.lang.cProfileUpdate, updatedAdmin)

    } catch (err) {
        return sendResponse(res, 500, err.message);

    }
}

// Export editProfile
module.exports = editProfile;