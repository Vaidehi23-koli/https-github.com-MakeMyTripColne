const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');

// Create booking
exports.createBooking = async (req, res) => {
    try {
        const booking = req.body;
        booking.user = req.user.id;

        // Validate booking type and related details
        if (booking.bookingType === 'flight') {
            const flight = await Flight.findById(booking.flight);
            if (!flight) {
                return res.status(404).json({
                    success: false,
                    message: 'Flight not found'
                });
            }

            // Check seat availability
            if (flight.seatsAvailable < booking.passengers.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Not enough seats available'
                });
            }

            // Update seats available
            flight.seatsAvailable -= booking.passengers.length;
            await flight.save();

        } else if (booking.bookingType === 'hotel') {
            const hotel = await Hotel.findById(booking.hotel);
            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    message: 'Hotel not found'
                });
            }

            // Find room type
            const roomType = hotel.roomTypes.find(r => r.type === booking.roomType);
            if (!roomType) {
                return res.status(404).json({
                    success: false,
                    message: 'Room type not found'
                });
            }

            // Check room availability
            if (roomType.roomsAvailable < booking.numberOfRooms) {
                return res.status(400).json({
                    success: false,
                    message: 'Not enough rooms available'
                });
            }

            // Update rooms available
            roomType.roomsAvailable -= booking.numberOfRooms;
            await hotel.save();
        }

        const newBooking = await Booking.create(booking);

        res.status(201).json({
            success: true,
            data: newBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('flight', 'flightNumber airline departureCity arrivalCity departureTime arrivalTime')
            .populate('hotel', 'name location pricePerNight');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get single booking
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('flight', 'flightNumber airline departureCity arrivalCity departureTime arrivalTime')
            .populate('hotel', 'name location pricePerNight');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if the booking belongs to the user or if the user is an admin
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Only admin can update booking status
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update booking status'
            });
        }

        booking.bookingStatus = req.body.status;
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};