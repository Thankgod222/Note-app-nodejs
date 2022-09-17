require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require("express-session");
const Note = require("./model/Note");


const app = express();

mongoose.connect(process.env.db_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("connected");
  });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "MyNoteAppSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);

app.set("view engine", "ejs");



app.get("/", async function (req, res) {
  Note.find({}, (error, port) => {
    if (error) {
      console.log(err);
       res.status(500).send({ message: error });
    } else {
      res.render("pages/index", { note: port });
    }
  });
 });


app.post("/create", async function (req, res) {

    const newNote = new Note({
    title: req.body.title,
    description: req.body.description,
  });
  
   newNote.save(function (err) {
    // res.send(err);
    if (!err) {
      // res.send("Successfully added a new note.");
      res.redirect("/")
    } else {
      
      res.status(400).send(err.message);
    }
  });
})
  

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});