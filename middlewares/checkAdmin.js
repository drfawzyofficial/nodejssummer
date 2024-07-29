// JS Strict Mode
"use strict";

const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/sendResponse");
const JWT_KEY = process.env.JWT_KEY;
const Admin = require("../models/Admin");
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        const admin =  await Admin.findById({ _id: decoded._id });
        if(!admin) {
            return sendResponse(res, 401, "The admin is not found in the database");
        }
        req.user = decoded;
        next();
    } catch(err) {
        return sendResponse(res, 401, "Authentication is failed");
    }
}