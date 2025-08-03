//core Module
const path = require("path");

//External Module
const multer = require("multer");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectMongoDBSession = require("connect-mongodb-session"); //function
const sessionStore = connectMongoDBSession(session); //class
require('dotenv').config();
const DB_PATH = process.env.DB_PATH;

//local module
const commonRouter = require("./routes/commonRouter");
const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathUtils");
const errorController = require("./controllers/errorController");

const app = express();

app.set("view engine","ejs");
app.set("views","views");

const store= new sessionStore({
  uri: DB_PATH,
  collection: "sessions"
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === 'img') {
      cb(null, "uploads/img");
    } else if(file.fieldname === 'docs') {
      cb(null, 'uploads/docs/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) =>  {
  if(file.fieldname === 'img') {
     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
       cb(null, true);
     } else {
       cb(null, false);
     }
  } else if (file.fieldname === 'docs') {
    if (file.mimetype === 'application/pdf') {
       cb(null, true);
     } else {
       cb(null, false);
     }
  }
 
}

const multerOptions = { //the middleware will process that one file and attach its metadata (like the file path, size, etc.) to req.file
  storage, fileFilter
};

app.use(session({
  secret: "airbnb",
  resave: false,
  saveUninitialized: true,
  store: store //session will now save in store rather than memory
}));

app.use(express.urlencoded());
app.use(multer(multerOptions).fields([
  { name: 'img', maxCount: 1 },
  { name: 'docs', maxCount: 1 }
]));
app.use(express.static(path.join(rootdir,"public")));
app.use("/uploads", express.static(path.join(rootdir,"uploads/")));



app.use((req,res,next) => {
  console.log(req.url,req.method);
  next();
});

app.use( (req,res,next)=> {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(commonRouter);
app.use(authRouter);
app.use("/host", hostRouter);
app.use(storeRouter);

app.use(errorController.get404);

const port = 3090;
mongoose.connect(DB_PATH).then(() => {
  app.listen(port,() => {
  console.log(`server is running on http://localhost:${port}`);
});
}).catch((err)=> {
  console.log("error while connecting to mongo:",err);
});