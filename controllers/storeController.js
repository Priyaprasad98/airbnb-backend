//local module
const Home = require("../model/home");
const User = require("../model/user");

exports.getHomes = (req,res,next) => {
  Home.find().then((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes, 
      pageTitle: "Homes List",
      currentPage: 'homes',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
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
        currentPage: 'homes',
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });
    }
  }); 
};

exports.getBookings = (req,res,next) => {
    res.render('store/bookings',{
      pageTitle: "My Bookings",
      currentPage: 'bookings',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    });
};

exports.getFavouriteList = async (req,res,next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favorites');
  res.render('store/favourite-list', {
    favoriteHomes: user.favorites,
    pageTitle: "My Favourites", 
    currentPage: 'favourites',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user 
  });
};

exports.postFavouriteList = async (req,res,next) => {
  const {action,id} = req.body;
  if(action === 'add') {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(!user.favorites.includes(id)) {
      user.favorites.push(id);
      await user.save();
    }
    res.redirect("/favorites");
  }

  else if(action === 'remove') {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(user.favorites.includes(id)) {
      user.favorites = user.favorites.filter(fav => fav != id );
      await user.save();
    }
    res.redirect("/favorites");
     //can be find using any attribute but findById() only finds using _id attribute
  }  
};




