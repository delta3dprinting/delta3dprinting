module.exports = (app, passport) => {
  // @route   GET profile/test
  // @desc    Tests post route
  // @access  Public
  app.get("/test", (req, res) => res.json({ msg: "Profile Works" }));
};
