const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route files
const auth = require('./routes/auth');
const flights = require('./routes/flights');
const hotels = require('./routes/hotels');
const bookings = require('./routes/bookings');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Mount routes
app.use('/api/auth', auth);
app.use('/api/flights', flights);
app.use('/api/hotels', hotels);
app.use('/api/bookings', bookings);

// Base route
app.get('/', (req, res) => {
    res.send('Make My Trip Clone API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Server Error',
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});