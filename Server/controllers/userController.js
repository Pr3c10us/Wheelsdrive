require('dotenv').config();
const { dynamoClient, TABLE_NAME } = require('../aws/dynamo');
const { BadRequestError } = require('../errors');
const axios = require('axios');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
    const { username } = req.user;

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError('oldPassword and newPassword are required');
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

    // decrypt with bcrypt and check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, userExist.Item.password);
    if (!isMatch) {
        throw new BadRequestError('Incorrect password');
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    // update password in the database
    const params = {
        TableName: TABLE_NAME,
        Key: {
            username: username,
        },
        UpdateExpression: 'set password = :password',
        ExpressionAttributeValues: {
            ':password': password,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    await dynamoClient.update(params).promise();

    res.status(200).json({
        msg: 'Password successfully changed',
    });
};

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

const deleteUser = async (req, res) => {
    const { username } = req.user;

    // get user from the database
    const userParams = {
        TableName: TABLE_NAME,
        Key: {
            username: username,
        },
    };

    await dynamoClient.delete(userParams).promise();

    // get all projects associated with username
    const projectsParams = {
        TableName: process.env.PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': username,
        },
    };

    const result = await dynamoClient.scan(projectsParams).promise();
    const projects = result.Items;
    // 2. Update each item's username
    const updatePromises = await projects.map((project) => {
        const projectParams = {
            TableName: process.env.PROJECTS_TABLE_NAME,
            Key: {
                id: project.id,
            },
        };
        return dynamoClient.delete(projectParams).promise();
    });

    // 3. Wait for all updates to complete
    await Promise.all(updatePromises);

    res.status(200).json({ msg: 'Account Deleted' });
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
    deleteUser,
    addGithubToken,
    changePassword,
};
