// Load User Profile Model
const UserProfile = require("../../models/UserProfile");

module.exports = (app, passport) => {
  // @route   GET profile/test
  // @desc    Tests post route
  // @access  Public
  app.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

  // @route   POST profile/save
  // @desc    Save Profile Changes
  // @access  Private
  app.post("/profile/save", restrictedPages, (req, res) => {
    console.log(req.body);
    res.send("Success!");
  });
};

// Route middleware to make sure a user is logged in
const restrictedPages = (req, res, next) => {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    loginStatus = true;
    return next();
  } else {
    loginStatus = false;
    // If they aren't redirect them to the homepage
    res.redirect("/");
  }
};
