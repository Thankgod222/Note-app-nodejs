require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const session = require("express-session");
const Note = require("./server/model/Note");


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
app.use(methodOverride('_method'));

app.use(
  session({
    secret: "MyNoteAppSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);

app.set("view engine", "ejs");



const route = require("./server/route/noteRoutes")
app.use("/", route);

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





  

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});