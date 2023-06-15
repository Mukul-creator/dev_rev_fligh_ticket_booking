const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },

    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },

    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },

    flightDuration: { type: Number, required: true },
    availableSeats: { type: Number, default: 60 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("flight", flightSchema);
