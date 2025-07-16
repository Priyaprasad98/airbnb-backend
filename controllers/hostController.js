//local module
const Home = require("../model/home");


exports.getAddHome = (req,res,next) => {
  res.render('host/homeAdd' , {pageTitle: "airbnb Add Home", currentPage: 'addHome'});
};

exports.postAddHome = (req,res,next) => {
  const {houseName, price, location, rating, img} = req.body;
  const home = new Home(houseName, price, location, rating, img);

  home.save();
  
  res.render('host/home-added' , {pageTitle: "Home added successfully", currentPage: 'homeAdded'});
};

exports.getHostHomes = (req,res,next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('host/host-home-list', 
      {registeredHomes: registeredHomes,
       pageTitle: 'Host Home List',
       currentPage: 'host-home-list'
    });
  });
};



