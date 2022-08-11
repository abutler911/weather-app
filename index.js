const express = require("express");
// const ejs = require("ejs");

const app = express();
const port = 3000;

//static files

app.use(express.static(__dirname + "/public"));

//set templating engine

app.set("view engine", "ejs");

//Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Now serving on port ${port}...`);
});
