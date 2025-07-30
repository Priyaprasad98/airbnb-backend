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
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      console.log('Error destroying session:', err);
      return res.redirect("/");
    }
  })
  res.redirect("/login");
}

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    currentPage: "signup",
    isLoggedIn: false
  });
}

exports.postSignup = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true; //setting flag
  res.redirect("/login");
}
