const Flight = require('../models/Flight');

// Get all flights
exports.getFlights = async (req, res) => {
    try {
        const { departureCity, arrivalCity, departureDate, class: flightClass } = req.query;

        // Build query
        let query = {};

        if (departureCity) query.departureCity = departureCity;
        if (arrivalCity) query.arrivalCity = arrivalCity;
        if (flightClass) query.class = flightClass;
        if (departureDate) {
            const date = new Date(departureDate);
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            
            query.departureTime = {
                $gte: date,
                $lt: nextDate
            };
        }

        const flights = await Flight.find(query);

        res.status(200).json({
            success: true,
            count: flights.length,
            data: flights
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get single flight
exports.getFlight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            });
        }

        res.status(200).json({
            success: true,
            data: flight
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Create flight (Admin only)
exports.createFlight = async (req, res) => {
    try {
        const flight = await Flight.create(req.body);

        res.status(201).json({
            success: true,
            data: flight
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update flight (Admin only)
exports.updateFlight = async (req, res) => {
    try {
        const flight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            });
        }

        res.status(200).json({
            success: true,
            data: flight
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete flight (Admin only)
exports.deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Flight deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};