// JS Strict Mode
"use strict";

// Require all Middlewares
const checkAdmin = require('./checkAdmin');
const checkLang = require('./checkLang');
const signupValidation = require('./signupValidation');
const changePassVal = require('./changePassVal');
const emailVerification = require('./emailVerification');
const profileValidation = require('./profileValidation');
const emailValidation = require('./emailValidation');
const emailSendValidation = require('./emailSendValidation');
const updateAvatar = require('./updateAvatar');
const checkAdminOnline = require('./checkAdminOnline');

// Export all Middlewares
module.exports = {  checkAdmin, checkLang, emailVerification, signupValidation, changePassVal, profileValidation, emailValidation, emailSendValidation, updateAvatar, checkAdminOnline }