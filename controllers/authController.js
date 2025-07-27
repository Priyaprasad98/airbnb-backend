exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login Your Credentials",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.isLoggedIn = true; //setting flag
  res.redirect("/homes");
}
