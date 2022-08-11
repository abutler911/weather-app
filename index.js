require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
//static files

app.use(express.static(__dirname + "/public"));

//set templating engine

app.set("view engine", "ejs");

//Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${req.body.city}`
    );
    const weatherData = response.data;
    console.log(weatherData);
  } catch (error) {
    console.log(error.response.body);
  }
});

app.listen(port, () => {
  console.log(`Now serving on port ${port}...`);
});
