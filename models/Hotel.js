const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide hotel name'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please provide hotel location']
    },
    description: {
        type: String,
        required: [true, 'Please provide hotel description']
    },
    images: [{
        type: String
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Please provide price per night']
    },
    roomTypes: [{
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        roomsAvailable: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    amenities: [{
        type: String
    }],
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);