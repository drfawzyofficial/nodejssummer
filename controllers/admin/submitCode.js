// JS Strict Mode
"use strict";

// Import Packages

// Import Models
const Admin = require('../../models/Admin');
const Code = require('../../models/Code');

// Import Utils 
const sendResponse = require('../../utils/sendResponse');

// SubmitCode method for submiting the code that has been send to the user email address
const submitCode = async (req, res) => {
    try {
        const admin = await Admin.findById({ _id: req.user._id });
        if(admin.is_verified === true) 
            return sendResponse(res, 400, req.lang.cAdminAlreadyVerified);
        const code = await Code.findOne({ _adminID: req.user._id });
        if(!code)
            return sendResponse(res, 400, req.lang.cExpiredCode);
            
        const isMatch = await code.checkCode(req.body.code);
        if(!isMatch) 
             return sendResponse(res, 400, req.lang.cCode);

        await Admin.findByIdAndUpdate({ _id: req.user._id }, { is_verified: true });
        await Code.findOneAndDelete({ _adminID: req.user._id });
        return sendResponse(res, 200, req.lang.cAdminVerified);
    } catch (err) {
        console.log(err.message)
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Export SubmitCode
module.exports = submitCode;