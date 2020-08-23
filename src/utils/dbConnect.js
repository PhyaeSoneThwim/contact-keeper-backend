const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
