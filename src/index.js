require("dotenv").config({});
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./utils/dbConnect");
const globalError = require("./middlewares/error");
const AppError = require("./utils/appError");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

app.use(express.json());
app.get(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

app.all("*", (req, res, next) => {
  return next(new AppError("no route defined", 404));
});

//setup global error handler
app.use(globalError);
//setup database connection
dbConnect();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running");
});
