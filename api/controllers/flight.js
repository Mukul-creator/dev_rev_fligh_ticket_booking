const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models/index");



exports.flightDataForUser = async (req, res) => {
  try {
    const { date, departureAirport, arrivalAirport, passenger } = req.query // date format 02-12-22
    if (!date || !departureAirport || !arrivalAirport) {
      res.status(400).json({ error: "Enter required fileds.!!" })
    } else {

      todaysDate = new Date()
      searchDate = new Date(date)
      nextDate = new Date((new Date(searchDate).getTime()) + 60 * 60 * 24 * 1000);


      flightData = await db.flight.find({
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departure: {
          $gte: searchDate,
          $gte: todaysDate,
          $lt: nextDate
        }, availableSeats: {
          $gte: passenger
        }
      }).select('airline flightNumber arrival departure departureAirport arrivalAirport flightDuration price availableSeats')

      return res.status(200).json(flightData);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });

  }
}


exports.flightDetails = async (req, res) => {
  try {
    const { flightId } = req.params

    flightData = await db.flight.findById(flightId).select('airline flightNumber arrival departure departureAirport arrivalAirport flightDuration price')


    return res.status(200).json(flightData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });

  }
}


