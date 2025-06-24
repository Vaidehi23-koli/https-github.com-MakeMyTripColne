const Hotel = require('../models/Hotel');

// Get all hotels
exports.getHotels = async (req, res) => {
    try {
        const { location, minPrice, maxPrice, rating } = req.query;

        // Build query
        let query = {};

        if (location) query.location = { $regex: location, $options: 'i' };
        if (minPrice || maxPrice) {
            query.pricePerNight = {};
            if (minPrice) query.pricePerNight.$gte = Number(minPrice);
            if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
        }
        if (rating) query.rating = { $gte: Number(rating) };

        const hotels = await Hotel.find(query).populate({
            path: 'reviews.user',
            select: 'name'
        });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get single hotel
exports.getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate({
            path: 'reviews.user',
            select: 'name'
        });

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        res.status(200).json({
            success: true,
            data: hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Create hotel (Admin only)
exports.createHotel = async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);

        res.status(201).json({
            success: true,
            data: hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update hotel (Admin only)
exports.updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        res.status(200).json({
            success: true,
            data: hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete hotel (Admin only)
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Hotel deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Add review
exports.addReview = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        // Check if user already reviewed
        const reviewed = hotel.reviews.find(
            review => review.user.toString() === req.user.id
        );

        if (reviewed) {
            return res.status(400).json({
                success: false,
                message: 'Already reviewed this hotel'
            });
        }

        const review = {
            user: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment
        };

        hotel.reviews.push(review);

        // Calculate average rating
        const totalRating = hotel.reviews.reduce((acc, item) => item.rating + acc, 0);
        hotel.rating = totalRating / hotel.reviews.length;

        await hotel.save();

        res.status(201).json({
            success: true,
            data: hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};