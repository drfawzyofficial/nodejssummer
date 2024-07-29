// JS Strict Mode
"use strict";

// Require all Admin Controllers
const changePassword = require('./admin/changePassword');
const adminDelete = require('./admin/adminDelete');
const editProfile = require('./admin/editProfile');
const adminLogin = require('./admin/adminLogin');
const adminSignup = require('./admin/adminSignup');
const submitCode = require('./admin/submitCode');
const resendCode = require('./admin/resendCode');
const adminLogout = require('./admin/adminLogout');
const adminSendEmail = require('./admin/adminSendEmail');
const adminMailAdd = require('./admin/adminMailAdd');
const uploadImage = require('./admin/uploadImage');
const getProfileData = require('./admin/getProfileData');


// Export All Admin Controllers
module.exports = { changePassword, adminDelete, submitCode, resendCode, editProfile, adminLogin, adminSignup, adminLogout, adminSendEmail, adminMailAdd, uploadImage, getProfileData }