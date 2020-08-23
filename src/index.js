require("dotenv").config({});
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./utils/dbConnect");
const globalError = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "no route defined",
  });
});

//setup global error handler
app.use(globalError);
//setup database connection
dbConnect();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running");
});
