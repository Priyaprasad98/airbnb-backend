//local module
const Home = require("../model/home");


exports.getAddHome = (req,res,next) => {
  res.render('host/edit-home' , {pageTitle: "airbnb Add Home", currentPage: 'addHome'});
};

exports.postAddHome = (req,res,next) => {
  const {houseName, price, location, rating, img} = req.body;
  const home = new Home(houseName, price, location, rating, img);

  home.save();
  
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req,res,next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('host/host-home-list', 
      {registeredHomes: registeredHomes,
       pageTitle: 'Host Home List',
       currentPage: 'host-home-list',
       editing: false
    });
  });
};

exports.getEditHome = (req,res,next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; //
  console.log(homeId,editing);
    Home.findById(homeId,home => {
      if(!home) {
        console.log("Home not found for editing.");
        res.redirect("/host/host-home-list");
        return;
      }
      else {
        res.render('host/edit-home' , {home:home ,pageTitle: "Edit Your Home", currentPage: 'host-home-list', editing: editing});
      }
    }); 
};

exports.postEditHome = (req,res,next) => {
  const {id,houseName, price, location, rating, img} = req.body;
  const home = new Home(houseName, price, location, rating, img);
  home.id = id;
  home.save();
  
  res.redirect("/host/host-home-list");
};



