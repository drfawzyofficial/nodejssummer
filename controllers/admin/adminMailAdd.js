// JS Strict Mode
"use strict";

// Import Packages

// Import Models
const Admin = require('../../models/Admin');
const Mail = require('../../models/Mail');
// Import Utils 
const sendResponse = require('../../utils/sendResponse');
const sendEmail = require('../../utils/sendEmail');

// adminMailAdd method for adding email settings
const adminMailAdd = async (req, res) => {
    try {
        const mail = await Mail.findOne({ _adminID: req.user._id });
        if(!mail) {
            req.body._adminID = req.user._id;
            await new Mail(req.body).save();
         } else {
           await Mail.findOneAndUpdate({ _adminID: req.user._id }, req.body);
         }       
        return sendResponse(res, 200, "Mail has been saved successfully");
      
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// Export adminMailAdd
module.exports = adminMailAdd;