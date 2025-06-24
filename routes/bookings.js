const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    getBooking,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .post(protect, createBooking)
    .get(protect, getUserBookings);

router
    .route('/:id')
    .get(protect, getBooking)
    .put(protect, authorize('admin'), updateBookingStatus);

module.exports = router;