const mongoose = require("mongoose");
const isURL = require("validator/lib/isURL");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 150,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: "Invalid URL.",
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: "Invalid URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    select: false,
  },
  likes: [
    {
      type: Array,
      ref: "user",
      default: [],
    },
  ],
});

module.exports = mongoose.model("article", articleSchema);
