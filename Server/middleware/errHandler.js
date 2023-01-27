const { CustomError } = require('../errors');
const storage = require('node-persist');
const {
    dynamoClient,
    PROJECTS_TABLE_NAME,
    codebuild,
    s3,
} = require('../aws/dynamo');

const errHandler = async (error, req, res, next) => {
    await storage.init();

    if (error instanceof CustomError) {
        return res.status(error.status).json({ msg: error.message });
    }
    if (error.code === 'ERR_BAD_REQUEST') {
        const { username } = req.user;

        // check if user exist in the database
        const existParams = {
            TableName: process.env.TABLE_NAME,
            Key: {
                username: username,
            },
        };
        const userExist = await dynamoClient.get(existParams).promise();
        if (!userExist.Item) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
                username: username,
            },
            UpdateExpression: 'set githubAuthToken = :githubAuthToken',
            ExpressionAttributeValues: {
                ':githubAuthToken': '',
            },
            ReturnValues: 'UPDATED_NEW',
        };

        dynamoClient.update(params).promise();

        console.log(error.code);
        return res.status(400).json({ msg: 'Github fail' });
    }
    if (error.code === 'ConditionalCheckFailedException') {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        return res.status(400).json({ msg: 'Verification of email Failed' });
    }
    if (error.code === 'MessageRejected') {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        return res.status(400).json({ msg: 'Verification of email Failed' });
    }
    console.log(error);
    console.log(error.code);

    return res.status(500).json({ msg: 'Internal Server Error' });
};

module.exports = errHandler;
