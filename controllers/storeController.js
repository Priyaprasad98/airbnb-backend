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

exports.getBookings = (req,res,next) => {
    res.render('store/bookings',{ pageTitle: "My Bookings",currentPage: 'bookings'});
};

exports.getFavouriteList = (req,res,next) => {
  const matchedHomes = [];
  Favorite.getFavorites().then(favorites => {
    favorites = favorites.map(fav => fav.homeId); //returns array of strings of homeId instead of an array of object
    Home.fetchAll().then((registeredHomes) => {
      //console.log(favorites, registeredHomes);
      registeredHomes.forEach((home) => {
        if (favorites.includes(home._id.toString())) {
          matchedHomes.push(home);
        }
      });
      res.render('store/favourite-list', { favorites: matchedHomes, pageTitle: "My Favourites", currentPage: 'favourites' });
    });
  });
};

exports.postFavouriteList = (req,res,next) => {
  const {action,id} = req.body;
  if(action === 'add') {
    const fav = new Favorite(id);
    fav.save().then(result => { 
      if(result) {
        console.log("fav added", result);
      }
      else {
        console.log("fav already exists, not added.");
      }

    }).catch(err => {
      console.log("error while marking favorite:",err);
    })
    .finally(() => {
      res.redirect("/favorites");
    });  
  }

  else if(action === 'remove') {
    Favorite.removeFavorite(id)
    .then(result => {
      console.log("fav removed", result);
    }).catch((error) => {
      console.log('Error while removing Favorites:',error);
    }).finally(() => {
      res.redirect("/favorites");
    }) 
  }
  
};




