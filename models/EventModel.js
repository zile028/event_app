/**
 * Event Model
 * Mongoose schema for event data with user relationships and likes functionality
 */

const { model, Schema } = require("mongoose");

/**
 * User sub-schema for likes functionality
 * Embedded user information for event likes
 */
const UserSchema = new Schema(
  {
    id: { type: Schema.ObjectId },
    fullName: { type: String },
  },
  { _id: false }
);

/**
 * Event Schema Definition
 * Defines structure and validation for event documents
 */
const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Naslov je obavezan!"],
      minlength: [5, "Minimalna dužina naslova je 5 karaktera!"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Naslovna slika je obavezna!"],
    },
    description: {
      type: String,
      required: [true, "Detalji događaja su obavezni!"],
      minlength: [10, "Minimalna dužina opisa je 10 karaktera!"],
      trim: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "users",
      required: [true, "Obavezno je dodati autora!"],
    },
    likes: [UserSchema],
    startAt: {
      type: Date,
      required: [true, "Početak događaja je obavezan!"],
    },
    endAt: {
      type: Date,
      required: [true, "Kraj događaja je obavezan!"],
    },
  },
  { 
    timestamps: true 
  }
);

/**
 * Create and export Event model
 */
const EventModel = model("events", EventSchema);

module.exports = EventModel;