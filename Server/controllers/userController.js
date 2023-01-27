require('dotenv').config();
const { dynamoClient, TABLE_NAME } = require('../aws/dynamo');
const { BadRequestError } = require('../errors');
const axios = require('axios');

const getUserInfo = async (req, res) => {
    const { username } = req.user;
    const params = {
        TableName: TABLE_NAME,
        Key: {
            username: username,
        },
    };

    const user = await dynamoClient.get(params).promise();
    res.status(200).json(user.Item);
};

// const updateUserInfo = async (req, res) => {};

const deleteUser = async (req, res) => {
    res.send('delete user');
};

const deleteGithubAuthToken = async (req, res) => {
    res.send('delete github auth token');
};

const addGithubToken = async (req, res) => {
    const { username } = req.user;
    let client_id = process.env.GITHUB_CLIENT_ID;
    let client_secret = process.env.GITHUB_CLIENT_SECRET;

    const { code } = req.body;
    if (!code) {
        throw new BadRequestError('code is required');
    }

    // check if user exist in the database
    const existParams = {
        TableName: TABLE_NAME,
        Key: {
            username: username,
        },
    };
    const userExist = await dynamoClient.get(existParams).promise();
    if (!userExist.Item) {
        throw new BadRequestError('User does not exist');
    }

    const getAuthTokenUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    const response = await axios(getAuthTokenUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    const githubToken = await response.data.access_token;
    if (!githubToken) {
        console.log(response.data);
        throw new BadRequestError('Github token not found');
    }

    const params = {
        TableName: TABLE_NAME,
        Key: {
            username: username,
        },
        UpdateExpression: 'set githubAuthToken = :githubAuthToken',
        ExpressionAttributeValues: {
            ':githubAuthToken': githubToken,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    dynamoClient.update(params).promise();

    res.status(200).json({ msg: 'Github token added' });
};

module.exports = {
    getUserInfo,
    // updateUserInfo,
    deleteUser,
    deleteGithubAuthToken,
    addGithubToken,
};
