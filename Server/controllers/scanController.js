require('dotenv').config();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { dynamoClient, PROJECTS_TABLE_NAME,codebuild } = require('../aws/dynamo');

const scanProject = async (req, res) => {
    // get the username from the request
    const { username } = req.user;
    // get repo name and clone url from the request body
    const { repo_name, clone_url } = req.query;

    // check if project already exist in the database
    const existParams = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository ',
        ExpressionAttributeValues: {
            ':username': username,
            ':repository': repo_name,
        },
    };
    const projectExist = await dynamoClient.scan(existParams).promise();
    // if project does not exist, create a new project
    if (projectExist.Items && projectExist.Items.length <= 0) {
        // generate a random string for the project id
        const id = uuid.v4();
        // create project with just username and repository name
        const params = {
            TableName: PROJECTS_TABLE_NAME,
            Item: {
                id,
                username,
                repository: repo_name,
                scan: 'in-progress',
            },
        };
        await dynamoClient.put(params).promise();
    }

    // specify buildspec.yml file path & use fs module to store builspec.yml file in the root directory of the project to a variable
    const buildspecPath = path.join(__dirname, '..', 'buildspec.yml');
    const buildspec = await fs.readFileSync(buildspecPath, 'utf8');

    // create codebuild params
    const params = {
        artifacts: {
            /* required */
            type: 'S3' /* required */,
            bucketOwnerAccess: 'FULL',
            location: process.env.CODEBUILD_ARTIFACTS_BUCKET_ARN,
            packaging: 'NONE',
            encryptionDisabled: true,
        },
        environment: {
            /* required */
            computeType: 'BUILD_GENERAL1_MEDIUM' /* required */,
            image: 'aws/codebuild/amazonlinux2-x86_64-standard:4.0' /* required */,
            type: 'LINUX_CONTAINER' /* required */,
            privilegedMode: true,
            environmentVariables: [
                {
                    name: 'REPO_NAME',
                    value: repo_name,
                },
                {
                    name: 'CLONE_URL',
                    value: clone_url,
                },
                {
                    name: 'USERNAME',
                    value: username,
                },
                {
                    name: 'S3_URL',
                    value: process.env.S3_URI,
                },
                {
                    name: 'S3_BUCKET_NAME',
                    value: process.env.S3_BUCKET_NAME,
                },
                {
                    name: 'UPDATE_POJRCT_URL',
                    value: process.env.UPDATE_POJRCT_URL,
                },
                /* more items */
            ],
        },
        name: repo_name /* required */,
        serviceRole: process.env.CODEBUILD_SERVICE_ROLE_ARN /* required */,
        source: {
            /* required */
            type: 'NO_SOURCE' /* required */,
            buildspec: buildspec,
        },
        logsConfig: {
            cloudWatchLogs: {
                status: 'DISABLED' /* required */,
            },
            s3Logs: {
                status: 'ENABLED' /* required */,
                bucketOwnerAccess: 'FULL',
                location: process.env.CODEBUILD_LOGS_BUCKET_ARN,
                encryptionDisabled: false,
            },
        },
    };

    await codebuild.createProject(params).promise();

    // start the build
    await codebuild.startBuild({ projectName: repo_name }).promise();

    console.log('done');

    res.json({
        msg: 'Project Scanned',
    });
};

const getProjectReport = async (req, res) => {
    res.json({
        msg: 'Project Report',
    });
};

module.exports = {
    scanProject,
    getProjectReport,
};
