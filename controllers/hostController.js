//local module
const Home = require("../model/home");
const Favorite = require("../model/favorite");

exports.getAddHome = (req,res,next) => {
  res.render('host/edit-home' , {pageTitle: "airbnb Add Home", currentPage: 'addHome', editing: false});
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
        res.render('host/edit-home' , {home:home ,pageTitle: "Edit Your Home", currentPage: 'host-home-list', editing: editing});
    }); 
};

exports.postAddHome = (req,res,next) => {
  const {houseName, price, location, rating, img, description} = req.body;
  const home = new Home(houseName, price, location, rating, img, description);

  home.save();
  
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req,res,next) => {
   Home.fetchAll().then(([registeredHomes,fields]) => {
    res.render('host/host-home-list', 
      {registeredHomes: registeredHomes,
       pageTitle: 'Host Home List',
       currentPage: 'host-home-list',
    });
  });
};



exports.postEditHome = (req,res,next) => {
  const {id, houseName, price, location, rating, img, description} = req.body;
  const home = new Home(houseName, price, location, rating, img, description, id);
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req,res,next) => {
  const id = req.body.id;
  console.log(id);
  Home.removeHome(id, (error) => {
    if(error) {
      console.log('Error while removing home:',error);
    }
    res.redirect("/host/host-home-list");
  })
  Favorite.removeFavorite(id, (error) => {
    if(error) {
      console.log('Error while removing Favorites:',error);
    }
    })
 
}    


  





