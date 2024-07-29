// JS Strict Mode
"use strict";

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../utils/sendResponse');

// adminDelete Controller for deleting an admin
const adminDelete = async (req, res, next) => {
    try {
        await Admin.findByIdAndDelete({ _id: req.user._id });
        return sendResponse(res, 200, req.lang.cDeletion);
    } catch (err) {
        return sendResponse(res, 500, err.message);

    }
}

// Export adminDelete
module.exports = adminDelete;