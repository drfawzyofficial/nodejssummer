// JS Strict Mode
"use strict";

// Import Packages
const bcrypt = require('bcryptjs');

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../utils/sendResponse');

// changePassword method for changing admin password
const changePassword = async (req, res) => {
    try {
        const admin = await Admin.findById({ _id: req.user._id });
        const isMatch = await admin.validatePassword(req.body.current_password);
        if(!isMatch)
             return sendResponse(res, 400, "The Password is wrong");
        new_password = await admin.cryptPassword(req.body.new_password);
        await Admin.findByIdAndUpdate({ _id: req.user._id }, { password: new_password });
        return sendResponse(res, 200, req.lang.cPassUpdate);
    } catch (err) {
        console.log(err.message)
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Export changePassword
module.exports = changePassword;