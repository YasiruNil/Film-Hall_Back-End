const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const filmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    director: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    releasedDate: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    ticketQuantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    mainActor: {
      type: String,
      maxlength: 32,
    },
    secondActor: {
      type: String,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Film", filmSchema);
