var mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    console.log(
      "******************************" +
        "Mongodb Connected" +
        "******************************"
    )
  )
  .catch((err) => console.log("Error: " + err));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
