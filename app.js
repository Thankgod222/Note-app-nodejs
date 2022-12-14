require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
// const cookieParser = require('cookie-parser')
const noteRoutes = require("./server/route/noteRoutes");
const userRoutes = require("./server/route/userRoutes");
const User = require("./server/model/User")




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
// app.use(cookieParser())


app.use(
  session({
    secret: "MyNoteAppSecretSession",
    resave: true,
    saveUninitialized: false,
  })
);


app.use((req, res, next) => {
  currentUser = req.session.user;
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  
   next();
})


app.set("view engine", "ejs");
app.use("/", noteRoutes);
app.use("/", userRoutes);





const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Serving on port ${port}`);
  });