// JS Strict Mode
"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;

const addressSchema = new Schema({
  city: String,
  street: String,
  houseNumber: Number,
});

const contactInfoSchema = mongoose.Schema({
  tel: String,
  phone: String,
  website: String,
  facebook_username: String,
  twitter_username: String,
  youtube_username: String,
  whatsAppNumber: String,
  address: addressSchema,
});

const adminSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is Mandatory"],
      minlength: 6,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
    },
    profilePic: {
      type: String,
      trim: true,
      required: true,
      default: `${process.env.SERVER_URL}/uploads/avatars/avatar.png`
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported",
      },
    },
    age: {
      type: Number,
      range: {
        min: { type: Number, min: 18 },
        max: { type: Number, min: 60 },
      },
    },
    dOB: Date,
    bio: {
      type: String,
      trim: true,
      minLength: [50, "Must be at least 50 chars, got {VALUE}"],
      maxLength: [150, "Must be at maximum 150 chars, got {VALUE}"],
    },
    role: {
      type: String,
      default: "Admin"
    },
    online: {
      type: Boolean,
      default: false
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    contactInfo: contactInfoSchema,
  },
  { timestamps: true }
);

adminSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(Number(SALT_WORK_FACTOR));
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});



adminSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

adminSchema.methods.cryptPassword = async function cryptPassword(data) {
  const salt = await bcrypt.genSalt(Number(SALT_WORK_FACTOR));
  return await bcrypt.hash(data, salt);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
