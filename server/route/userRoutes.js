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





module.exports = router;