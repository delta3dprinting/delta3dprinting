const path = require("path");

// Load User Profile Model
const UserProfile = require("../../models/UserProfile");

module.exports = (app, passport) => {
  // @route   GET /Profile
  // @desc    Get Profile HTML
  // @access  Private
  app.get("/Profile", restrictedPages, (req, res) => {
    if (req.user.accountType == "admin") {
      res.sendFile(path.join(__dirname, "../../views/adminProfile.html"));
    } else if (req.user.accountType == "normal") {
      res.sendFile(path.join(__dirname, "../../views/profile.html"));
    }
  });

  // @route   GET /profile
  // @desc    Get Profile Details
  // @access  Private
  app.get("/Profile/profile-details", restrictedPages, (req, res) => {
    UserProfile.findOne({ ownerId: req.user._id }, (err, profile) => {
      res.send(profile);
    });
  });

  // @route   POST /profile/save
  // @desc    Save Profile Changes
  // @access  Private
  app.post("/Profile/save-profile-details", restrictedPages, (req, res) => {
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
