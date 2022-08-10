const express = require("express");
const ejs = require("ejs");

const app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});

app.get("/index", (res, req) => {
  console.log(req.body);
});
