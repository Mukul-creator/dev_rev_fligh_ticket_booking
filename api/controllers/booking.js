const db = require("../models/index");
const bookingUtils = require("../utils/bookingUtils")


exports.createBooking = async (req, res) => {
    try {
        const { noOfPassengers, passengers, flight } = req.body
        if (!noOfPassengers || !passengers || !flight ) {
            res.status(400).json({ error: "Enter required fileds.!!" })
        } else {

            // check availibility
            flightData = await db.flight.findOne({
                _id: flight,
                availableSeats: {
                    $gte: noOfPassengers
                }
            })
            if (!flightData) {
                res.status(403).json({ error: "Flight already booked, try again!" });
            } else {
                bookingData = {
                    noOfPassengers: noOfPassengers,
                    passengers: passengers,
                    flight: flight,
                    amount: noOfPassengers * flightData.price,
                    status: "upcoming",
                    user: req.userInfo.userId
                }

                flightBooking = await db.booking.create(bookingData)
                if (flightBooking) {
                    // update seat in flight
                    updateSeat = await db.flight.updateOne({ _id: flight }, { $inc: { availableSeats: (-noOfPassengers) } })

                    flightData = await db.booking.findById(flightBooking._id)
                        .populate('user', 'fullName email')
                        .populate('flight', 'airline flightNumber departure arrival departureAirport arrivalAirport flightDuration')


                    return res.status(200).json(flightData);
                } else {
                    res.status(403).json({ error: "Something went wrong!" });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });

    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params
        if (!bookingId) {
            res.status(400).json({ error: "Enter bookingId!" })
        } else {

            bookingData = await db.booking.findOneAndUpdate({ _id: bookingId, user: req.userInfo.userId }, {
                status: "cancelled"
            })
                .populate('user', 'fullName email')
                .populate('flight', 'airline flightNumber departure arrival departureAirport arrivalAirport flightDuration')

            return res.status(200).json(bookingData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });

    }
}

exports.myBookings = async (req, res) => {
    try {

        update = await bookingUtils.updateStatusByUserId(req.userInfo.userId)

        flightData = await db.booking.find({ user: req.userInfo.userId })
            .populate('user', 'fullName email')
            .populate('flight', 'airline flightNumber departure arrival departureAirport arrivalAirport flightDuration')

        return res.status(200).json(flightData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });

    }
}

exports.bookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params
        if (!bookingId) {
            res.status(400).json({ error: "Enter bookingId.!!" })
        } else {
            update = await bookingUtils.updateStatusByUserId(req.userInfo.userId)

            flightData = await db.booking.findOne({ _id: bookingId, user: req.userInfo.userId })
                .populate('user', 'fullName email')
                .populate('flight', 'airline flightNumber departure arrival departureAirport arrivalAirport flightDuration')

            return res.status(200).json(flightData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });

    }
}