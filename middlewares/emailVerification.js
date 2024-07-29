// JS Strict Mode
"use strict";

const sendResponse = require("../utils/sendResponse");
const Admin = require("../models/Admin");
module.exports = async (req, res, next) => {
    try {
        const admin =  await Admin.findById({ _id: req.user._id });
        if(admin.is_verified === false) 
            return sendResponse(res, 403, req.lang.cAdminNotVerified);
        next();
    } catch(err) {
        return sendResponse(res, 500, "Server Error");
    }
}