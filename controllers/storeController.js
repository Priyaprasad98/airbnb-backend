//local module
const Home = require("../model/home");
const Favorite = require("../model/favorite");

exports.getIndex = (req,res,next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render('store/index', {
      registeredHomes: registeredHomes, 
        pageTitle: "airbnb Home",
        currentPage: 'index'
      });
  });
};

exports.getHomes = (req,res,next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes, 
      pageTitle: "Homes List",
      currentPage: 'homes'
    });
  });
};

exports.getFavouriteList = (req,res,next) => {
  const matchedHomes = [];
  Favorite.getFavorites((favorites) => {
    Home.fetchAll().then((registeredHomes) => {
      registeredHomes.forEach((home) => {
        if (favorites.includes(home._id)) {
          matchedHomes.push(home);
        }
      });
      res.render('store/favourite-list', { favorites: matchedHomes, pageTitle: "My Favourites", currentPage: 'favourites' });
    });
  });
};

exports.getBookings = (req,res,next) => {
    res.render('store/bookings',{ pageTitle: "My Bookings",currentPage: 'bookings'});
};

exports.getHomeDetails = (req,res,next) => {
  const homeId = req.params.homeId; 
  Home.findById(homeId).then((home) => {
    if(!home) {
      res.redirect("/homes");
      console.log("Home not Found");
    }
    else {
      res.render('store/home-details',{ 
      home: home,
      pageTitle: "Home Detail",
      currentPage: 'homes'});
    }
  }); 
};

exports.postFavouriteList = (req,res,next) => {
  const {action,id} = req.body;
  if(action === 'add') {
    Favorite.addToFavorite(id, (error) => {
    if(error) {
      console.log('Error while marking Favorites:',error);
    }
    res.redirect("/favorites");
  })
  }
  else if(action === 'remove') {
    Favorite.removeFavorite(id, (error) => {
    if(error) {
      console.log('Error while removing Favorites:',error);
    }
    res.redirect("/favorites");
    })
  }
  
};




