const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models/index");

// const user = require("../models/user")

exports.add_flight = async (req, res) => {
  try {
    const {
      airline,
      flightNumber,
      departure,
      arrival,
      departureAirport,
      arrivalAirport,
      flightDuration,
      price,
    } = req.body;

    flightData = await db.flight.create({
      airline: airline,
      flightNumber: flightNumber,
      departure: departure,
      arrival: arrival,
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      flightDuration: flightDuration,
      price: price,
    });

    return res.status(200).json({ message: "flight added", flightData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
