// JS Strict Mode
"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const codeSchema = Schema({
  _adminID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
  code: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
});

codeSchema.methods.checkCode = async function checkCode(code) {
  return bcrypt.compare(code, this.code);
};

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
