function restrictTo(role) { 
  return (req, res, next) => {
   if (req.session.isLoggedIn && req.session.user.userType === role) {
      return next();
    }
    return res.status(403).render("403page", {
      pageTitle: "Access Denied",
      currentPage: "403page",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    });
  }
  };

  module.exports = restrictTo;

