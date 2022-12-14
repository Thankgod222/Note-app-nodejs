const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  author: {
    type: String,
    ref: "User"
  },
  },
  {timestamps: true}
  );
  
  module.exports = mongoose.model("Note", noteSchema);