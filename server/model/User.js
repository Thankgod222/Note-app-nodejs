const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
    },
   password: {
    type: Number,
    required: "This field is required.",
  },
  },
  {timestamps: true}
);


  
  module.exports = mongoose.model("User", userSchema);