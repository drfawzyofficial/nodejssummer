// JS Strict Mode
"use strict";

const validator = require('../utils/validator');
const sendResponse = require('../utils/sendResponse');
const emailSendValidation = async (req, res, next) => {
    try {
        const validationRule = {
            "email": "required|string|email",
            "message": "required|string|min:50|max:150",
        };       
        await validator(req.body, validationRule, req.lang, (err, status) => {
            if (!status) {
                    return sendResponse(res, 400, "Validation failed", err);
            } 
            next();
        });
    } catch(err) {
        console.log(err.message);
    }
   
}
module.exports = emailSendValidation;