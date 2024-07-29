// JS Strict Mode
"use strict";

const validator = require('../utils/validator');
const sendResponse = require('../utils/sendResponse');
const signupValidation = async (req, res, next) => {
    try {
        const validationRule = {
            "fullname": "required|string|min:6",
            "email": "required|string|email|exist:Admin,email",
            "password": "required|string|min:6|strict|confirmed",
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
module.exports = signupValidation;