const express = require("express");
const router = express.Router();
const Note = require("../model/Note");



// TO DISPLAY INDIVIDUAL NOTES
router.get("/", async function (req, res) {
  if (req.session.user != undefined ) {
  var author = req.session.user._id;
  Note.find({ "author": author }, (error, notes) => {
    if (error) {
      console.log(error);
       res.status(500).send({ message: error });
    } else {
      res.render("pages/index", { note: notes });
    }
  });
  } else {
    res.redirect("/login")
  }
 
 });



router.get("/notes", async function (req, res) {
    Note.find(
     { title: req.params.title},
      function(err) {
        if (!err) {
        res.redirect("/")
    } else {
        res.send(err);
      }
    }
    )
})

router.post("/notes", async function (req, res) {
    const newNote = new Note({
    title: req.body.title,
    description: req.body.description, 
    author: req.session.user._id,
    });

   newNote.save(function (err) {
    // res.send(err);
     if (!err) {
      res.redirect("/")
    } else {
      res.status(400).send(err.message);
    }
   });  
})




router.get("/notes/:noteTitle", async function (req, res) {
  Note.findOneAndDelete(
    { title: req.params.noteTitle},
    function(err) {
      if (!err) {
        res.redirect("/")
      } else {
        res.send(err);
      }
    }
  )
})



module.exports = router;