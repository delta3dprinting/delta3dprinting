const path = require("path");

// Load User Model
const User = require("../../models/User");

module.exports = (app, passport) => {
  // @route   GET users/test
  // @desc    Tests post route
  // @access  Public
  app.get("/users/test", (req, res) => res.json({ msg: "Users Works" }));

  // @route   POST users/signup
  // @desc    User register
  // @access  Public
  app.post(
    "/users/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/", // redirect back to the homepage
      failureRedirect: "/users/login" // redirect back to the homepage
    })
  );

  // @route   POST users/login
  // @desc    User login
  // @access  Public
  app.post(
    "/users/login",
    passport.authenticate("local-login", {
      successRedirect: "/", // redirect back to the homepage
      failureRedirect: "/users/login" // redirect back to the homepage
    })
  );

  // @route   GET users/profile
  // @desc    Tests profile route
  // @access  Private
  app.get("/users/profile", isLoggedIn, (req, res) => {
    res.json({ msg: "Profile Works" });
  });

  // @route   GET users/login
  // @desc    Receive failed login attempts
  // @access  Public
  app.get("/users/login", (req, res) => res.json({ msg: "Failed to Login" }));

  // @route   POST users/logout
  // @desc    Logout user
  // @access  Public
  app.get("/users/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};

// Route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // If they aren't redirect them to the homepage
  res.redirect("/");
};
