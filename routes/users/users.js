const express = require("express");
const router = express.Router();

// @route   GET users/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST users/signup
// @desc    Register User
// @access  Public
router.post("/signup", (req, res) => {
  console.log(req.body);
});

// @route   POST users/login
// @desc    Login User
// @access  Public
router.post("/login", (req, res) => {
  console.log(req.body);
});

module.exports = router;
