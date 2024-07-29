// JS Strict Mode
"use strict";

const multer = require("multer");
const sendResponse = require("../utils/sendResponse");
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/avatars/')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${file.fieldname}.png`)
  }
})
const systemStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/hospital_avatars/')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${file.fieldname}.png`)
  }
})
const updateAvatar = (req, res, next) => {
  console.log(`${req.originalUrl}`)
  let storageOriginal;
  if (req.originalUrl === "/api/admin/profile/upload-pic") {
    storageOriginal = profileStorage;
  } else if(req.originalUrl === "/api/system/image/update") {
    storageOriginal = systemStorage;
  }
  const upload = multer({ storage: storageOriginal }).single('avatar');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError || err)
      return sendResponse(res, 400, err.message);
    if (!req.file)
      return sendResponse(res, 400, 'Please upload a file');
    next();
  })
}
module.exports = updateAvatar;