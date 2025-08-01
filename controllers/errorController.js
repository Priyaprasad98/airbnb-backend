exports.get404 = (err,req,res,next) => {
  res.status(404).render('404page',{
    pageTitle: "page not found",
    currentPage: "404page",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user 
  });
};

exports.get403 = (err,req,res,next) => {
  res.status(404).render('403page',{
    pageTitle: "Access Denied",
    currentPage: "403page",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user 
  });
};
