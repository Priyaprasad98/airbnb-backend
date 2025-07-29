exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login Your Credentials",
    currentPage: "login",
    isLoggedIn: false
  });
}

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true; //setting flag
  //res.cookie("isLoggedIn", true);
  //req.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  console.log(req.body);
  //res.clearCookie("isLoggedIn");
  req.session.destroy((err) => {
    if(err) {
      console.log('Error destroying session:', err);
      return res.redirect("/");
    }
  })
  res.redirect("/login");
}

exports.getsignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    currentPage: "signup",
    isLoggedIn: false
  });
}
