// JS Strict Mode
"use strict";

// Import Packages

// Import Models
const Admin = require('../../models/Admin');
const Mail = require('../../models/Mail');
// Import Utils 
const sendResponse = require('../../utils/sendResponse');

// uploadImage method for updating a profile picture to the admin
const uploadImage = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate({ _id: req.user._id }, { profilePic: `${process.env.SERVER_URL}/uploads/avatars/${req.user._id}-avatar.png` });
        return sendResponse(res, 200, "The profile Picture has been updated successfully");
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// Export uploadImage
module.exports = uploadImage;