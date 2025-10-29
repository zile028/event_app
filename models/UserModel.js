/**
 * User Model
 * Mongoose schema for user data with authentication and profile management
 */

const { Schema, model } = require("mongoose");
const { AVATAR_IMG } = require("../config");

/**
 * User Schema Definition
 * Defines structure and validation for user documents
 */
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "Ime mora sadržati bar 3 karaktera!"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Prezime mora sadržati bar 3 karaktera!"],
  },
  email: {
    type: String,
    required: [true, "Email je obavezan."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Lozinka je obavezna."],
  },
  role: {
    type: String,
    default: "guest",
    enum: {
      values: ["admin", "manager", "visitors", "guest"],
      message: "{VALUE} nije validna uloga!",
    },
  },
  favorites: [{ type: Schema.ObjectId }],
  active: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: AVATAR_IMG,
  },
}, {
  timestamps: true,
});

/**
 * Create and export User model
 */
const UserModel = model("users", UserSchema);

module.exports = UserModel;