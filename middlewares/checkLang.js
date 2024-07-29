// JS Strict Mode
"use strict";

const sendResponse = require("../utils/sendResponse");
const { en, ar } = require("../lang/lang");
module.exports = (req, res, next) => {
    try {
        const acceptedLang = req.headers["accept-language"];
        const lang = acceptedLang === "ar"? ar : en;
        req.lang = lang;
        next();
    } catch(err) {
        console.log(err.message)
        return sendResponse(res, 500, "Something went wrong");
    }
}