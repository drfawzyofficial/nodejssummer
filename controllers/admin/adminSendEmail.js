// JS Strict Mode
"use strict";

// Import Packages

// Import Models
const Admin = require('../../models/Admin');
const Mail = require('../../models/Mail');
// Import Utils 
const sendResponse = require('../../utils/sendResponse');
const sendEmail = require('../../utils/sendEmail');

// adminSendEmail method for sending an email to the user
const adminSendEmail = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        const mail = await Mail.findOne({ _adminID: req.user._id });
        if(!mail)
            return sendResponse(res, 400, "You do not have one email setting");
        if(admin)
            return sendResponse(res, 400, req.lang.cNoAdminEmaill);
        const user = { email: req.body.email }
        const content = { subject: "Notification", title: "Hospital System", message: req.body.message }
        await sendEmail(mail, user, content);
        return sendResponse(res, 200, req.lang.cEmailMessage);
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// Export adminSendEmail
module.exports = adminSendEmail;