exports.get404 = (req,res,next) => {
  res.status(404).render('404page' , {pageTitle: "page not found",currentPage: "404page" });
}

exports.getAddHome = (req,res,next) => {
  res.render('host/homeAdd' , {pageTitle: "airbnb Add Home", currentPage: 'homeAdd'});
}