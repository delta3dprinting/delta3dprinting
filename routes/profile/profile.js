// Load User Profile Model
const UserProfile = require("../../models/UserProfile");

module.exports = (app, passport) => {
  // @route   GET /profile
  // @desc    Get Profile Details
  // @access  Private
  app.get("/profile", restrictedPages, (req, res) => {
    UserProfile.findOne({ ownerId: req.user._id }, (err, profile) => {
      res.send(profile);
    });
  });

  // @route   POST /profile/save
  // @desc    Save Profile Changes
  // @access  Private
  app.post("/profile/save", restrictedPages, (req, res) => {
    UserProfile.findOne({ ownerId: req.user._id }).then(profile => {
      // Update Profile Values
      for (component in req.body) {
        if (component == "shippingAddress") {
          for (component in req.body.shippingAddress) {
            profile.shippingAddress[component] =
              req.body.shippingAddress[component];
          }
        } else {
          profile[component] = req.body[component];
        }
      }
      profile.save((err, profile) => {
        if (err) throw err;

        console.log(profile);

        res.send("success");
      });
    });
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
