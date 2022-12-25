const AWS = require('aws-sdk');
require('dotenv').config();

// Create a DynamoDB client
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES();

module.exports = {
    ses,
};
