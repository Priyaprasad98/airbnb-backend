//external module
const path = require("path");
const fs = require("fs");

//local module
const Home = require("../model/home");
const rootDir = require("../utils/pathUtils");

exports.getAddHome = (req,res,next) => {
  res.render('host/edit-home',{
    pageTitle: "airbnb Add Home",
    currentPage: 'addHome',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};

exports.getEditHome = (req,res,next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; 
    Home.findById(homeId).then((home) => {
      if(!home) {
        console.log("Home not found for editing.");
        res.redirect("/host/host-home-list");
        return;
      }
      res.render('host/edit-home',{
        home:home,
        pageTitle: "Edit Your Home",
        currentPage: 'host-home-list',
        editing: editing,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });
    }); 
};

exports.postAddHome = (req,res,next) => {
   console.log("[HOST CONTROLLER] postAddHome triggered");
  const {houseName, price, location, rating, description} = req.body;

  if(!req.files || !req.files.img || !req.files.img[0]) {
    return res.status(422).send("No image provided");
  } else if(!req.files.docs || !req.files.docs[0]) {
    return res.status(422).send("No docs for rule book provided");
  }
  const img = req.files.img[0].filename;
  const docs = req.files.docs[0].filename;
  const home = new Home({
    houseName, 
    price, 
    location, 
    rating, 
    img, 
    docs,
    description
  });
  home.save().then(() => {
    console.log("Home saved sucessfully!");
  });
   res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req,res,next) => {
   Home.find().then(registeredHomes => {
    res.render('host/host-home-list', 
      {registeredHomes: registeredHomes,
       pageTitle: 'Host Home List',
       currentPage: 'host-home-list',
       isLoggedIn: req.isLoggedIn,
       user: req.session.user
    });
  });
};

exports.postEditHome = (req,res,next) => {
  const {id, houseName, price, location, rating, description} = req.body;
  
  Home.findById(id).then((home) => {
  home.houseName = houseName;
  home.price = price;
  home.location = location;
  home.rating = rating;
  home.description = description;

  if(req.files.img && req.files.img[0]) {
    const filePath = path.join(rootDir, 'uploads','img', home.img );
     fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error while deleting file ", err);
        }
      });
    home.img = req.files.img[0].filename;
  } 

  else if(req.files.docs && req.files.docs[0]) {
    const filePath = path.join(rootDir, 'uploads','docs', home.docs );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error while deleting file ", err);
      }
    });
    home.docs = req.files.docs[0].filename;
  }

  home.save().then(() => {
    console.log("Home saved sucessfully!");
  })
  .catch(err => {
    console.log("Error while updating", err);
  })
  res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while finding home", err);
  }); 
};

exports.postDeleteHome = (req,res,next) => {
  const homeId = req.body.id;
  Home.findByIdAndDelete(homeId)
  .then(() => {
    res.redirect("/host/host-home-list");
  })
  .catch( (error) => {
    console.log('Error while removing home:',error);
  });  
};
    


  





