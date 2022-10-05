const express = require('express');
const router = express.Router();
const User = require("../model/User");




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
    console.log(savedUser);
    if (!err) {
        req.session.user = savedUser._id;
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
    if (!user) {
      
      res.redirect("/register")
    } else {
      res.redirect("/")
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
})

router.post("/logout", function (req, res) {
     res.redirect("/login")
})

  module.exports = router;