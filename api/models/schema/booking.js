const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    noOfPassengers: { type: Number, required: true, default: 1},
    passengers:[{
      title: {type: String},
      firstName: {type: String},
      lastName: {type: String},
      age: {type: Number}
    }],
    amount: {type: String, required: true},
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true
    },
    status: { type: String, required: true, default: "upcoming", enums: ['upcoming', 'completed', 'cancelled']}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
