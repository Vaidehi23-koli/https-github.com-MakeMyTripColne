# Make My Trip Clone - Backend API

A RESTful API for the Make My Trip Clone project built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Flight Search and Booking
- Hotel Search and Booking
- Booking Management
- Admin Panel for Data Operations
- JWT Authentication
- Role-based Access Control

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for Authentication
- Bcrypt for Password Hashing
- Cors for Cross-Origin Resource Sharing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=24h
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Flights

- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get single flight
- `POST /api/flights` - Create new flight (Admin)
- `PUT /api/flights/:id` - Update flight (Admin)
- `DELETE /api/flights/:id` - Delete flight (Admin)

### Hotels

- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get single hotel
- `POST /api/hotels` - Create new hotel (Admin)
- `PUT /api/hotels/:id` - Update hotel (Admin)
- `DELETE /api/hotels/:id` - Delete hotel (Admin)
- `POST /api/hotels/:id/reviews` - Add hotel review

### Bookings

- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id` - Update booking status (Admin)

## Query Parameters

### Flights

- `departureCity` - Filter by departure city
- `arrivalCity` - Filter by arrival city
- `departureDate` - Filter by departure date
- `class` - Filter by flight class (economy, business, first)

### Hotels

- `location` - Filter by hotel location
- `minPrice` - Filter by minimum price
- `maxPrice` - Filter by maximum price
- `rating` - Filter by minimum rating

## Authentication

All protected routes require a Bearer token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Error Responses

```json
{
    "success": false,
    "message": "Error message",
    "error": "Detailed error information"
}
```

## Success Responses

```json
{
    "success": true,
    "data": {}
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.