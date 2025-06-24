const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: [true, 'Please provide flight number'],
        unique: true,
        trim: true
    },
    airline: {
        type: String,
        required: [true, 'Please provide airline name']
    },
    departureCity: {
        type: String,
        required: [true, 'Please provide departure city']
    },
    arrivalCity: {
        type: String,
        required: [true, 'Please provide arrival city']
    },
    departureTime: {
        type: Date,
        required: [true, 'Please provide departure time']
    },
    arrivalTime: {
        type: Date,
        required: [true, 'Please provide arrival time']
    },
    price: {
        type: Number,
        required: [true, 'Please provide ticket price']
    },
    seatsAvailable: {
        type: Number,
        required: [true, 'Please provide available seats'],
        min: 0
    },
    class: {
        type: String,
        enum: ['economy', 'business', 'first'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Flight', flightSchema);