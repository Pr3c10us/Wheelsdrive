const uuid = require('uuid');
const { dynamoClient, PROJECTS_TABLE_NAME } = require('../aws/dynamo');
const { BadRequestError, NotFoundError } = require('../errors');

const createProject = async (req, res) => {
    const {
        repository,
        clone_url,
        blocked,
        critical,
        major,
        minor,
        info,
        s3_url,
    } = req.body;
    // check if repository name is provided
    if (!repository) {
        throw new BadRequestError('Please provide repository name');
    }

    // get username from req.user
    const { username } = req.user;

    // create date
    const date = new Date().toLocaleString();

    // check if project already exist
    const existParams = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository ',
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
            created: new Date().toLocaleDateString(),
            id,
            username,
            repository,
            clone_url,
            blocked,
            critical,
            major,
            minor,
            info,
            last_scanned: date,
            s3_url,
        },
    };
    await dynamoClient.put(params).promise();

    res.json({
        msg: 'Project Added',
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
        throw new BadRequestError('Please provide repository name');
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

    // if no project found throw error
    if (project.Items.length === 0) {
        throw new NotFoundError('Project not found');
    }

    // return project
    res.json(project.Items[0]);
};

const updateProject = async (req, res) => {
    // get required data from request body
    const { blocked, critical, major, minor, info, s3_url } = req.body;

    // get username from req.user
    const { username } = req.user;

    // get repository name from params
    const { repository } = req.params;
    // check if repository name is provided
    if (!repository) {
        throw new BadRequestError('Please provide repository name');
    }

    // Check if project exist
    const params = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository',
        ExpressionAttributeValues: {
            ':username': username,
            ':repository': repository,
        },
    };
    const project = await dynamoClient.scan(params).promise();
    if (project.Items.length === 0) {
        throw new NotFoundError('Project not found');
    }

    const date = new Date().toLocaleString();

    // update project
    const updateParams = {
        TableName: PROJECTS_TABLE_NAME,
        Key: {
            id: project.Items[0].id,
        },
        UpdateExpression:
            'set blocked = :blocked, critical = :critical, major = :major, minor = :minor, info = :info, last_scanned = :last_scanned, s3_url = :s3_url',
        ExpressionAttributeValues: {
            ':blocked': blocked,
            ':critical': critical,
            ':major': major,
            ':minor': minor,
            ':info': info,
            ':last_scanned': date,
            ':s3_url': s3_url,
        },
        ReturnValues: 'UPDATED_NEW',
    };
    await dynamoClient.update(updateParams).promise();

    res.json({
        msg: 'Project Updated',
    });
};

const deleteProject = async (req, res) => {
    // get username from req.user
    const { username } = req.user;

    // get repository name from params
    const { repository } = req.params;

    // check if repository name is provided
    if (!repository) {
        throw new BadRequestError('Please provide repository name');
    }

    // Check if project exist
    const params = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository',
        ExpressionAttributeValues: {
            ':username': username,
            ':repository': repository,
        },
    };
    const project = await dynamoClient.scan(params).promise();

    // if no project found throw error
    if (project.Items.length === 0) {
        throw new NotFoundError('Project not found');
    }

    // delete project
    const deleteParams = {
        TableName: PROJECTS_TABLE_NAME,
        Key: {
            id: project.Items[0].id,
        },
    };
    await dynamoClient.delete(deleteParams).promise();

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
