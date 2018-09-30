const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/Homepage/homepage.html"));
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
