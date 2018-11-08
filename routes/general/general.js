const path = require("path");

module.exports = (app, passport) => {
  // @route   GET /
  // @desc    Route User to the Homepage Page
  // @access  Public
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/homepage.html"));
  });

  // @route   GET /About
  // @desc    Route User to the About Page
  // @access  Public
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/about.html"));
  });

  // @route   GET /About
  // @desc    Route User to the About Page
  // @access  Public
  app.get("/about/team", (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/aboutTeam.html"));
  });

  // @route   GET /About
  // @desc    Route User to the About Page
  // @access  Public
  app.get("/about/partners", (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/aboutPartners.html"));
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
