const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "This field is required.",
  },
  lastName: {
    type: String,
    required: "This field is required.",
    },
  email: {
    type: String,
    required: "This field is required.",
    },
   password: {
    type: String,
    required: "This field is required.",
  },
  },
  {timestamps: true}
  );
  
  module.exports = mongoose.model("User", userSchema);