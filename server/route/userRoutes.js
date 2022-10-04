const express = require('express');
const router = express.Router();
const User = require("../model/User")



router.get("/register", function (req, res) {
    res.render("pages/register")
})

router.post("/register", async function (req, res) {
  
    const newUser = new User({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password
  })
   newUser.save(function (err) {
      if (!err) {
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
   const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
})





module.exports = router;