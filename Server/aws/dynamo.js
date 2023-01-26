const AWS = require('aws-sdk');
require('dotenv').config();

// Create a DynamoDB client
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;
const PROJECTS_TABLE_NAME = process.env.PROJECTS_TABLE_NAME;

const s3 = new AWS.S3()
const codebuild = new AWS.CodeBuild();


module.exports = {
    dynamoClient,
    TABLE_NAME,
    PROJECTS_TABLE_NAME,
    s3,
    codebuild,
};
