// JS Strict Mode
"use strict";

// Import Packages

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../utils/sendResponse');

// SubmitCode method for changing the status of user to online
const adminLogout = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate({ _id: req.user._id }, { online: false }, {new: true});
        return sendResponse(res, 200, req.lang.cAdminLogout);
    } catch (err) {
        console.log(err.message)
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Export adminLogout
module.exports = adminLogout;