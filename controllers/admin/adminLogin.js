// JS Strict Mode
"use strict";

// Import Packages
const jwt = require('jsonwebtoken');
// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../utils/sendResponse');

// Account Login Controller
const adminLogin = async (req, res) => {
    try {

        const lang = req.lang;
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email});
        let isMatch;

        if (!admin) {
            return sendResponse(res, 401, lang.cEmail);
        }

        isMatch = await admin.validatePassword(password);

        if(!isMatch) return sendResponse(res, 401, lang.cPassword);

        const updatedAdmin =  await Admin.findByIdAndUpdate({ _id: admin._id }, { online: true }, {new: true});
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_KEY);
        const result = { token: token, admin: updatedAdmin };
        return sendResponse(res, 200, lang.cLoginSuccess, result);
    } catch (err) {
        console.log(err.message);
        return sendResponse(res, 500, err.message);
    }
}


// Export adminLogin
module.exports = adminLogin;