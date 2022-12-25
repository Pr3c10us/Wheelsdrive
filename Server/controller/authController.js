// Import required modules
require('dotenv').config();
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT

// Import errors
const { BadRequestError } = require('../errors');
// Import the DynamoDB Document Client and Table Name
const { dynamoClient, TABLE_NAME } = require('../database/dynamo');

const signup = async (req, res) => {
    let { email, password, username } = req.body;

    // check if email and password is provided
    if (!email || !password || !username) {
        throw new BadRequestError('Please provide email,username and password');
    }

    // Capitalize usernae
    username = username.toUpperCase();

    // check if username exist
    const usernameParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'username = :username ',
        ExpressionAttributeValues: {
            ':username': username,
        },
    };
    const usernameTaken = await dynamoClient.scan(usernameParams).promise();
    if (usernameTaken.Items && usernameTaken.Items.length > 0) {
        throw new BadRequestError('Username Taken');
    }
    // check if email exist
    const emailParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email ',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const emailTaken = await dynamoClient.scan(emailParams).promise();
    if (emailTaken.Items && emailTaken.Items.length > 0) {
        throw new BadRequestError('Email address already exist');
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // create user
    const user = {
        username,
        email,
        password,
        authorizedGithub: false,
    };
    const params = {
        TableName: TABLE_NAME,
        Item: user,
    };
    await dynamoClient.put(params).promise();

    res.json({
        msg: 'Account Sucessfully Created',
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Missing email or password');
    }

    // check if email exist
    const emailParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email ',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const user = await dynamoClient.scan(emailParams).promise();

    if (user.Items.length === 0) {
        throw new BadRequestError('Email address does not exist');
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.Items[0].password);
    if (!isMatch) {
        throw new BadRequestError('Wrong password');
    }

    // create jwt
    const payload = {
        username: user.Items[0].username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.cookie('token', token, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
    }).json({
        msg: 'Login Sucessful',
    });
};

const logout = (req, res) => {
    res.clearCookie('token').json({
        msg: 'Logout Sucessful',
    });
};

module.exports = {
    signup,
    login,
    logout,
};
