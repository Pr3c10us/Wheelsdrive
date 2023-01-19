const uuid = require('uuid');
const { dynamoClient, PROJECTS_TABLE_NAME } = require('../aws/dynamo');
const { BadRequestError } = require('../errors');

const createProject = async (req, res) => {
    const { repository } = req.body;
    // check if repository name is provided
    if (!repository) {
        throw new BadRequestError('Missing repository name');
    }

    // get username from req.user
    const { username } = req.user;

    // check if project already exist
    const existParams = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository',
        ExpressionAttributeValues: {
            ':username': username,
            ':repository': repository,
        },
    };
    const projectExist = await dynamoClient.scan(existParams).promise();
    if (projectExist.Items && projectExist.Items.length > 0) {
        throw new BadRequestError('Project already exist');
    }

    // generate a random string for the project id
    const id = uuid.v4();

    // create project with just username and repository name
    const params = {
        TableName: PROJECTS_TABLE_NAME,
        Item: {
            scanned: false,
            id,
            username,
            repository,
        },
    };
    await dynamoClient.put(params).promise();

    res.json({
        msg: 'Project Created',
    });
};

const getAllProjects = async (req, res) => {
    // get username from req.user
    const { username } = req.user;

    // get all projects for the user
    const params = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': username,
        },
    };
    const projects = await dynamoClient.scan(params).promise();

    // return all projects
    res.json({
        projects: projects.Items,
    });
};

const getProject = async (req, res) => {
    const { repository } = req.params;
    // check if repository name is provided
    if (!repository) {
        throw new BadRequestError('Missing repository name');
    }

    // get username from req.user
    const { username } = req.user;

    // get project for the user
    const params = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository',
        ExpressionAttributeValues: {
            ':username': username,
            ':repository': repository,
        },
    };
    const project = await dynamoClient.scan(params).promise();

    // return project
    res.json(project.Items[0]);
};

const updateProject = async (req, res) => {
    res.json({
        msg: 'Project Updated',
    });
};

const deleteProject = async (req, res) => {
    res.json({
        msg: 'Project Deleted',
    });
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
};
