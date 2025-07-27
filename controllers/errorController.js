exports.get404 = (req,res,next) => {
  res.status(404).render('404page',{
    pageTitle: "page not found",
    currentPage: "404page",
    isLoggedIn: req.isLoggedIn 
  });
}
