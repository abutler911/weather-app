require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { query } = require("express");

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

app.get("/result", (req, res) => {
  res.render("result");
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${req.body.city}`
    );
    const weatherData = response.data;
    const location = response.data.request.query;
    const time = response.data.current.observation_time;
    const windDirection = response.data.current.wind_dir;
    const windSpeed = response.data.current.wind_speed;
    const temp = response.data.current.temperature;
    const iconURL = response.data.current.weather_icons;

    const result = {
      location: location,
      time: time,
      windDirection: windDirection,
      windSpeed: windSpeed,
      temp: temp,
      icon: iconURL,
    };
    console.log(result);
    res.render("home", { result: result });
  } catch (error) {
    console.log(error.response.body);
  }
});

app.listen(port, () => {
  console.log(`Now serving on port ${port}...`);
});
