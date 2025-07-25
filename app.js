//core Module
const path = require("path");

//External Module
const express = require("express");

//local module
const storeRouter = require("./routes/storeRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootdir = require("./utils/pathUtils");
const errorController = require("./controllers/errorController");
const {mongoConnect} = require("./utils/database");

const app = express();

app.set("view engine","ejs");
app.set("views","views");

app.use((req,res,next) => {
  console.log(req.url,req.method);
  next();
});

app.use(express.urlencoded());

app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootdir,'public')));

app.use(errorController.get404);

const port = 3090;
mongoConnect(client => {
  //console.log(client);
  app.listen(port,() => {
  console.log(`server is running on http://localhost:${port}`);
});
})

