const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

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

const port = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/Homepage/homepage.html"));
});

// Routing
// Users
const users = require("./routes/users/users");
app.use("/users", users);
// Profile
const profile = require("./routes/profile/profile");
app.use("/profile", profile);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
