require("dotenv").config({});
const express = require("express");
const dbConnect = require("./utils/dbConnect");
const app = express();

//setup database connection
dbConnect();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running");
});
