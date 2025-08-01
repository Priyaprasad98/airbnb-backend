const Home = require("../model/home");

exports.getIndex = (req,res,next) => {
  Home.find().then((registeredHomes) => {
    res.render('store/index', {
      registeredHomes: registeredHomes, 
        pageTitle: "airbnb Home",
        currentPage: 'index',
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });
  });
};