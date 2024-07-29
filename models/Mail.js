// JS Strict Mode
"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const mailSchema = Schema({
  _adminID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
  mailHost: {
    type: String,
    required: [true, "Mail Host is required"],
    trim: true,
    maxLength: [150, "Must be at maximum 150 chars, got {VALUE}"],
  },
  mailPort: {
    type: Number,
    required: [true, "Mail Port is required"],
  },
  mailService: {
    type: String,
    required: [true, "Mail Service is required"]
  },
  mailAddress: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Mail Address is required"],
  },
  mailPassword: {
    type: String,
    required: [true, "Mail Password is required"],
    trim: true,
  },
}, { timestamps: true });

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
