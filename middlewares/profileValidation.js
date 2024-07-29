// JS Strict Mode
"use strict";

const validator = require('../utils/validator');
const sendResponse = require('../utils/sendResponse');
const profileValidation = async (req, res, next) => {
    try {
        const validationRule = {
            "gender": "string|in:male,female",
            "age": "integer|between:18,60",
            "dOB": "date",
            "email": "required|string|email",
            "fullname": "required|string|min: 6",
            "bio": "string|min:50|max:150",
            "contactInfo.tel": "string",
            "contactInfo.phone": "string",
            "contactInfo.website": "string",
            "contactInfo.facebook_username": "string|max:25",
            "contactInfo.twitter_username": "string|max:25",
            "contactInfo.youtube_username": "string|max:25",
            "contactInfo.whatsAppNumber": "string|max:25",
            "contactInfo.address.city": "string|max:25",
            "contactInfo.address.street": "string|max:25",
            "contactInfo.address.houseNumber": "integer",
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
module.exports = profileValidation;