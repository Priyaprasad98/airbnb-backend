//core Module
const path = require("path");

//External Module
const express = require("express");
const {mongoose} = require("mongoose");
const session = require("express-session");

//local module
const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootdir = require("./utils/pathUtils");
const errorController = require("./controllers/errorController");

const app = express();

app.set("view engine","ejs");
app.set("views","views");

app.use(express.urlencoded());

app.use(session({
  secret: "airbnb",
  resave: false,
  saveUninitialized: true
}));

app.use((req,res,next) => {
  console.log(req.url,req.method);
  next();
});

app.use( (req,res,next)=> {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req,res,next) => {
  if(req.isLoggedIn) {
    next();
  }
  else {
    res.redirect("/login");
  }
});
app.use("/host",hostRouter);

app.use(express.static(path.join(rootdir,'public')));

app.use(errorController.get404);

const port = 3090;
const DB_PATH = "***REMOVED***";

mongoose.connect(DB_PATH).then(() => {
  app.listen(port,() => {
  console.log(`server is running on http://localhost:${port}`);
});
}).catch((err)=> {
  console.log("error while connecting to mongo:",err);
})