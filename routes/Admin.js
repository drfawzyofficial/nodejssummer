// Include Packages
const express = require("express");
const router = express.Router();

// Include Controllers
const { changePassword, adminDelete, adminLogout, adminSendEmail,  submitCode, adminMailAdd, resendCode, editProfile, adminLogin, adminSignup, uploadImage, getProfileData  } = 
require("../controllers/index");

// Include Middlewares
const { checkAdmin, checkLang, emailVerification, emailSendValidation, emailValidation, signupValidation, profileValidation, changePassVal, updateAvatar, checkAdminOnline } = require("../middlewares/index");

// Signup Post Request for storing admin data to database
router.post("/signup", checkLang, signupValidation, adminSignup);

// Login Post Request for logging the admin to the system
router.post("/login", checkLang, adminLogin);

// Logout Post Request for loggoing out the user from the system
router.post("/logout", checkLang, checkAdmin, checkAdminOnline, adminLogout);

// Delete Request for deleting the admin from the system
router.delete("/delete", checkLang, checkAdmin, checkAdminOnline, adminDelete);

// The admin will add a mail config for sending emails to the users that are related to the system
router.post("/mail/add", checkLang, checkAdmin, checkAdminOnline, emailVerification, emailValidation, adminMailAdd);

// SendMail Request that allows the admin to send an email to the user
router.post("/sendmail",  checkLang, checkAdmin, checkAdminOnline, emailVerification, emailSendValidation, adminSendEmail);

// Password Edit Request that allows the admin to change Password
router.post("/password/edit", checkLang, checkAdmin, checkAdminOnline, changePassVal, changePassword);

// SubmitCode Request for submitting the sent code to the admin email for verifying the account
router.post("/code/submit",  checkLang, checkAdmin, checkAdminOnline, submitCode);

// ResendCode Request for resending the code to the admin email
router.post("/code/resend", checkLang, checkAdmin, checkAdminOnline, resendCode);

// PorfileEdit Request for editing the admin profile
router.post("/profile/edit", checkLang, checkAdmin, checkAdminOnline, profileValidation, editProfile);

// PorfileEdit Request for getting the admin profile data
router.get("/getprofile", checkLang, checkAdmin, checkAdminOnline,  getProfileData);

// Profile UploadPic Request for upading the profile pic
router.post("/profile/upload-pic", checkLang, checkAdmin, updateAvatar, uploadImage);


// Export Router
module.exports = router;