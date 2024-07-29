// JS Strict Mode
"use strict";

const validator = require('../utils/validator');
const sendResponse = require('../utils/sendResponse');
const emailValidation = async (req, res, next) => {
    try {
        const validationRule = {
            "mailHost": "required|string|max:150",
            "mailPort": "required|integer",
            "mailService": "required|string|max:150",
            "mailAddress": "required|string|max:150",
            "mailPassword": "required|string",
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
module.exports = emailValidation;