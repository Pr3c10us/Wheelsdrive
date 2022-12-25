require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnAuthorizedError } = require('../errors');

const authorize = async (req, res, next) => {
    const { token } = req.signedCookies;
    if (!token) {
        throw new UnAuthorizedError('Missing Token');
    }
    try {
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { username };
        next();
    } catch (error) {
        throw new UnAuthorizedError('Authentication failed');
    }
};

module.exports = authorize;
