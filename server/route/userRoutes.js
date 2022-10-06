const express = require('express');
const router = express.Router();
const User = require("../model/User");
const session = require("express-session");



router.use(
  session({
    secret: "MyNoteAppSecretSession",
    resave: false,
    saveUninitialized: true,
  })
);



router.get("/register", function (req, res) {
    res.render("pages/register")
})

  
router.post("/register", async function (req, res) {
    const user = new User({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password
    })
  user.save(function (err, savedUser) {
    // console.log(savedUser);
    if (!err) {
      // SAVING SESSION TO A USER.ID
       req.session.user = savedUser;
      res.redirect("/")
    } else { 
      res.status(400).send(err.message);
    }
  })
})

  
router.get("/login", function (req, res) {
    res.render("pages/login")
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
   
    if (user) {
      // console.log(user.username)
        req.session.user = user;
      res.redirect("/")
    } else {
      res.redirect("/register")
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
})

router.get("/logout", function (req, res) {
   req.session.destroy(function(err) {
  // cannot access session here
     res.redirect("/login")
})
   
})





  module.exports = router;