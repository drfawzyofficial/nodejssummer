// JS Strict Mode
"use strict";

const sendResponse = require("../utils/sendResponse");
const Admin = require("../models/Admin");
module.exports = async (req, res, next) => {
    try {
        const admin =  await Admin.findById({ _id: req.user._id });
        if(admin.online === false) {
            return sendResponse(res, 401, "You must login first to do this action");
        }
        next();
    } catch(err) {
        return sendResponse(res, 401, "Authentication is failed");
    }
}