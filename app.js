const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();


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



app.get("/", function (req, res) {
  res.render("pages/index");
 }
);
  

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});