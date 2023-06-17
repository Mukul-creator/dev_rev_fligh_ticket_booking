const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const flightController = require("../controllers/flight");
const adminController = require("../controllers/admin");
const bookingController = require("../controllers/booking")

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

// user-routes
router.post("/signup", userController.user_signup);
router.post("/login", userController.user_login);


router.get("/flights",checkAuth, flightController.flightDataForUser);
router.get("/flightdetails/:flightId" ,checkAuth, flightController.flightDetails);

router.post("/createbooking",checkAuth, bookingController.createBooking );
router.post("/cancelbooking/:bookingId",checkAuth, bookingController.cancelBooking);
router.get("/bookings",checkAuth, bookingController.myBookings);
router.get("/booking/:bookingId",checkAuth, bookingController.bookingDetails);



// Admin -apis

router.post("/addflight",checkAdmin, adminController.add_flight);
router.delete("/removeflight/:flightId",checkAdmin, adminController.remove_flight);
router.get("/allflights",checkAdmin, adminController.flightsDataForAdmin);
router.get("/flightData/:flightId",checkAdmin, adminController.flightAllData);
router.get('/admin/bookings', checkAdmin, adminController.bookings);



module.exports = router;
