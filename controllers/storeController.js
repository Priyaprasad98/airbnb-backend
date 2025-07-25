//local module
const Home = require("../model/home");
const Favorite = require("../model/favorite");

exports.getIndex = (req,res,next) => {
  Home.find().then((registeredHomes) => {
    res.render('store/index', {
      registeredHomes: registeredHomes, 
        pageTitle: "airbnb Home",
        currentPage: 'index'
      });
  });
};

exports.getHomes = (req,res,next) => {
  Home.find().then((registeredHomes) => {
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
  Favorite.find().populate('homeId').
  then(favorites => {
    console.log("before mapping",favorites);
    const favoriteHomes = favorites.map(fav => fav.homeId);
    console.log("after mapping",favoriteHomes);
      res.render('store/favourite-list', {
        favoriteHomes: favoriteHomes,
        pageTitle: "My Favourites", 
        currentPage: 'favourites' 
      });
    });
};

exports.postFavouriteList = (req,res,next) => {
  const {action,id} = req.body;
  if(action === 'add') {
    Favorite.findOne({ homeId: id})
      .then(existingFav => {
        if(existingFav) {
          res.redirect("/favorites");
          return null;
        }
        const fav = new Favorite({homeId: id});
        return fav.save();
      })
      .then(() => {
        return res.redirect("/favorites");
      })
      .catch(err => {
        console.log("error while marking favorite:",err);
      });
  }

  else if(action === 'remove') {
    Favorite.findOneAndDelete({homeId: id}) //can be find using any attribute but findById() only finds using _id attribute
    .then(result => {
      console.log("fav removed", result);
    }).catch((error) => {
      console.log('Error while removing Favorites:',error);
    }).finally(() => {
      res.redirect("/favorites");
    }) 
  }
  
};




