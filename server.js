const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const keys = require("./config/key/key");

const app = express();

const port = process.env.PORT || 80;

// Body Parser Middleware (Get Information from HTML Forms)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Other Express Applications
app.use(morgan("dev")); // Log Every Request to the Console
app.use(cookieParser()); // Read Cookies (for Authentication)

// Database Configuration
const db = require("./config/database/database").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// Passport Configuration
require("./config/passport/passport")(passport); // pass passport for configuration

// Required for Passport
app.use(
  session({
    secret: keys.key, // Session Secret
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session()); // Persistent Logan Sessions

// Routing
require("./routes/users/users")(app, passport); // Users
require("./routes/profile/profile")(app, passport); // Profile

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
