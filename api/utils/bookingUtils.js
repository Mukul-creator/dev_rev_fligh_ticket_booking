const db = require("../models/index");


exports.updateStatusByUserId = async (userId) => {
    try {
        data = await db.booking.find({ user: userId, status: "upcoming" }).populate('flight')
        if (data) {
            bookingIds = []
            data.forEach(booking => {
                currentDate = new Date()
                if (booking.flight.departure < currentDate) {
                    bookingIds.push(booking._id)
                }
            })
            updateData = await db.booking.updateMany({ _id: bookingIds, status: "upcoming" }, { status: "completed" })
            console.log("Booking status updated!")
            return true
        }
        else {
            return false
        }

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

exports.updateStatus = async () => {
    try {
        data = await db.booking.find({ status: "upcoming" }).populate('flight')
        if (data) {
            bookingIds = []
            data.forEach(booking => {
                currentDate = new Date()
                if (booking.flight.departure < currentDate) {
                    bookingIds.push(booking._id)
                }
            })
            updateData = await db.booking.updateMany({ _id: bookingIds, status: "upcoming" }, { status: "completed" })
            console.log("Booking status updated!")
            return true
        }
        else {
            return false
        }

    } catch (error) {
        console.log(error);
        return error.message;
    }
}
