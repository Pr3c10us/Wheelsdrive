const { dynamoClient, TABLE_NAME } = require('../aws/dynamo');
const { BadRequestError } = require('../errors');

const getUserInfo = async (req, res) => {
    res.json(req.user);
};

const updateUserInfo = async (req, res) => {};

const deleteUser = async (req, res) => {
    res.send('delete user');
};

const deleteGithubAuthToken = async (req, res) => {
    res.send('delete github auth token');
};

const addGithubToken = async (req, res) => {
    const { username } = req.user;

    const { githubToken } = req.body;
    if (!githubToken) {
        throw new BadRequestError('Missing github token');
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
    updateUserInfo,
    deleteUser,
    deleteGithubAuthToken,
    addGithubToken,
};
