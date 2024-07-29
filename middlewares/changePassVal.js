// JS Strict Mode
"use strict";

const validator = require('../utils/validator');
const sendResponse = require('../utils/sendResponse');
const changePassVal = async (req, res, next) => {
    try {
        // const _id = req.user._id;
        const validationRule = {
            // "current_password": `validatePassword:Admin,${_id}`,
            "new_password": "required|string|min:6|strict|confirmed"
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
module.exports = changePassVal;