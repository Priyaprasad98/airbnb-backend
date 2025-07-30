const { validationResult, check } = require("express-validator");

exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login Your Credentials",
    currentPage: "login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true; //setting flag
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      console.log('Error destroying session:', err);
      return res.redirect("/");
    }
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up",
    currentPage: "signup",
    isLoggedIn: false
  });
};

exports.postSignup = [

  //First Name Validation
  check("firstName")
  .trim()
  .notEmpty()
  .withMessage("First name is required")
  .isLength({min: 2})
  .withMessage("First name should be atleast 2 characters long")
  .matches(/^[A-Z\a-z\s]+$/)
  .withMessage("First name should only contain alphabets"),
 
  //First Name Validation
  check("lastName")
  .matches(/^[A-Z\a-z\s]*$/)
  .withMessage("Last name should only contain alphabets"),
  
  //Email validation
  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  //Password Validation
  check("password")
  .isLength({min: 8})
  .withMessage("Password must be at least 8 characters long")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number")
  .matches(/[!@#$%^&]/)
  .withMessage("Password must contain at least one special character")
  .trim(),

  //confirm password validation
  check("confirmPassword")
  .trim()
  .custom((value, {req}) => { 
    //the second argument is meta ie. it's a full object containing request and other details. so we use destructuring 
   /*custom((value, meta) => {
      const req = meta.req; 
      ...
     }) 
   */
    if(value !== req.body.password) {
      throw new Error("Passwords do not match")
    }
    return true;
  }),

  //user Type Validation
  check("userType")
  .notEmpty()
  .withMessage("User Type is required")
  .isIn(["guest","host"])
  .withMessage("Invalid User Type"),

  //Terms Accepted Validation
  check("termsAccepted")
  .notEmpty()
  .withMessage("You must accept the terms and conditions")
  .custom((value,{req}) => {
    if(value !== "on") {
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  }),
  
  //Final handler Middleware
  (req, res, next) => {
  
  const { firstName, lastName, email, password, userType } = req.body;
  const errors = validationResult(req);
    console.log(req.body);
  console.log(errors);
  if(!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      currentPage: 'signup',
      pageTitle: "Sign Up",
      isLoggedIn: false,
      errors: errors.array().map(error => error.msg),
      oldInput: {
        firstName,
        lastName,
        email,
        password,
        userType
      }
    })
  }
  res.redirect("/login");
 }
];
