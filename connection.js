var mongoose = require("mongoose");
// require("dotenv").config();
const mongoDB = process.env.MONGOURI;

mongoose
  .connect(
    "mongodb+srv://mukul:mukul2652@cluster0.uh6sq82.mongodb.net/flightTicketBooking?retryWrites=true&w=majority",
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
