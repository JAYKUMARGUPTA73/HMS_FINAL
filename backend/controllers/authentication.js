const jwt = require('jsonwebtoken');
const User = require('../models/usermodel.js');

// Middleware function to authenticate users
const authenticateUser = async (req, res, next) => {
    try {
        // Get the JWT token from the request cookies
        const token = req.cookies.jwt;

        // Verify the token
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);

            // Check if the user exists
            if (user) {
                req.user = user; // Attach the user object to the request
                next(); // Proceed to the next middleware
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('JWT token not found');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware function to authenticate admins
const authenticateAdmin = async (req, res, next) => {
    try {
        // Get the JWT token from the request cookies
        const token = req.cookies.jwt;

        // Verify the token
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);

            // Check if the user exists and is an admin
            if (user && user.admin) {
                req.user = user; // Attach the user object to the request
                next(); // Proceed to the next middleware
            } else {
                throw new Error('Unauthorized');
            }
        } else {
            throw new Error('JWT token not found');
        }
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticateUser, authenticateAdmin };
