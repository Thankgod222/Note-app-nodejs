const express = require("express");
const router = express.Router();
const Note = require("../model/Note");


router.get("/", async function (req, res) {
  Note.find({}, (error, port) => {
    if (error) {
      console.log(err);
       res.status(500).send({ message: error });
    } else {
      res.render("pages/index", { note: port });
    }
  });
 });


router.post("/notes", async function (req, res) {
   const { id } = req.params;
    const note = await Note.findById(id);
   if(note.author.equals(req.user._id)) {
    const newNote = new Note({
    title: req.body.title,
    description: req.body.description, 
    author: req.session.user,
    });

   newNote.save(function (err) {
    // res.send(err);
     if (!err) {
      res.redirect("/")
    } else {
      res.status(400).send(err.message);
    }
   });
       
  } else {
     res.status(400).send(err.message); 
  }
  
})


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