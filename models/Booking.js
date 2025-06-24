const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    bookingType: {
        type: String,
        enum: ['flight', 'hotel'],
        required: true
    },
    flight: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flight',
        required: function() {
            return this.bookingType === 'flight';
        }
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: function() {
            return this.bookingType === 'hotel';
        }
    },
    checkIn: {
        type: Date,
        required: function() {
            return this.bookingType === 'hotel';
        }
    },
    checkOut: {
        type: Date,
        required: function() {
            return this.bookingType === 'hotel';
        }
    },
    roomType: {
        type: String,
        required: function() {
            return this.bookingType === 'hotel';
        }
    },
    numberOfRooms: {
        type: Number,
        required: function() {
            return this.bookingType === 'hotel';
        },
        min: 1
    },
    passengers: [{
        name: String,
        age: Number,
        seatNumber: String
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);