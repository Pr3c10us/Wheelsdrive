const axios = require('axios');
const {
    dynamoClient,
    PROJECTS_TABLE_NAME,
    s3,
    codebuild,
} = require('../aws/dynamo');
const { BadRequestError, NotFoundError } = require('../errors');
const severityCountFunction = require('../utils/severityCount');

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
    // get s3_bucket_name, repo_name, username from req.query
    const { s3_bucket_name, repo_name, username } = req.query;

    // check if s3_bucket_name, repo_name, username is provided
    if (!s3_bucket_name || !repo_name || !username) {
        throw new BadRequestError(
            'Please provide s3_bucket_name, repo_name, username'
        );
    }

    // get report from s3
    let scanReport = await s3
        .getObject({
            Bucket: s3_bucket_name,
            Key: `${repo_name}.json`,
        })
        .promise();
    scanReport = JSON.parse(scanReport.Body).issues;

    // filter issues by type
    const bugIssues = scanReport.filter((issue) => issue.type === 'BUG');
    const vulnerabilityIssues = scanReport.filter(
        (issue) => issue.type === 'VULNERABILITY'
    );
    const codeSmellIssues = scanReport.filter(
        (issue) => issue.type === 'CODE_SMELL'
    );

    // get each severity count
    const severitiesCount = await severityCountFunction(
        bugIssues,
        vulnerabilityIssues,
        codeSmellIssues
    );

    // check if project exist
    const params = {
        TableName: PROJECTS_TABLE_NAME,
        FilterExpression: 'username = :username and repository = :repository',
        ExpressionAttributeValues: {
            ':username': username,
            ':repository': repo_name,
        },
    };
    const project = await dynamoClient.scan(params).promise();
    if (project.Items.length === 0) {
        throw new NotFoundError('Project not found');
    }

    // get date
    const date = new Date().toLocaleString();

    // update project
    const updateParams = {
        TableName: PROJECTS_TABLE_NAME,
        Key: {
            id: project.Items[0].id,
        },
        UpdateExpression:
            'set bugBlocker = :bugBlocker, bugCritical = :bugCritical, bugMajor = :bugMajor, bugMinor = :bugMinor, bugInfo = :bugInfo, vulnerabilityBlocker = :vulnerabilityBlocker, vulnerabilityCritical = :vulnerabilityCritical, vulnerabilityMajor = :vulnerabilityMajor, vulnerabilityMinor = :vulnerabilityMinor, vulnerabilityInfo = :vulnerabilityInfo, codeSmellBlocker = :codeSmellBlocker, codeSmellCritical = :codeSmellCritical, codeSmellMajor = :codeSmellMajor, codeSmellMinor = :codeSmellMinor, codeSmellInfo = :codeSmellInfo, last_scanned = :last_scanned, s3_bucket_name = :s3_bucket_name, repository = :repository,scan_status = :scan_status',
        ExpressionAttributeValues: {
            ':bugBlocker': severitiesCount.bugBlocker,
            ':bugCritical': severitiesCount.bugCritical,
            ':bugMajor': severitiesCount.bugMajor,
            ':bugMinor': severitiesCount.bugMinor,
            ':bugInfo': severitiesCount.bugInfo,
            ':vulnerabilityBlocker': severitiesCount.vulnerabilityBlocker,
            ':vulnerabilityCritical': severitiesCount.vulnerabilityCritical,
            ':vulnerabilityMajor': severitiesCount.vulnerabilityMajor,
            ':vulnerabilityMinor': severitiesCount.vulnerabilityMinor,
            ':vulnerabilityInfo': severitiesCount.vulnerabilityInfo,
            ':codeSmellBlocker': severitiesCount.codeSmellBlocker,
            ':codeSmellCritical': severitiesCount.codeSmellCritical,
            ':codeSmellMajor': severitiesCount.codeSmellMajor,
            ':codeSmellMinor': severitiesCount.codeSmellMinor,
            ':codeSmellInfo': severitiesCount.codeSmellInfo,
            ':last_scanned': date,
            ':s3_bucket_name': s3_bucket_name,
            ':repository': repo_name,
            ':scan_status': 'done',
        },
        ReturnValues: 'UPDATED_NEW',
    };

    await dynamoClient.update(updateParams).promise();

    await codebuild.deleteProject({ name: repo_name }).promise();

    // return updated project
    res.json({
        message: 'Project updated successfully',
        project: {
            ...project.Items[0],
            ...severitiesCount,
            last_scanned: date,
            s3_bucket_name,
            repository: repo_name,
        },
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

    // delete project json file in s3
    await s3
        .deleteObject({
            Bucket: project.Items[0].s3_bucket_name,
            Key: `${project.Items[0].repository}.json`,
        })
        .promise();

    res.json({
        msg: 'Project Deleted',
    });
};

const getSearchRepositories = async (req, res) => {
    // get githubAuthToken from params and search_query from query
    const { githubAuthToken } = req.params;
    const { search_query } = req.query;

    // check if githubAuthToken is provided
    if (!githubAuthToken) {
        throw new BadRequestError('Please provide githubAuthToken');
    }

    // get user's username from access token
    const user = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Token ${githubAuthToken}`,
        },
    });

    // get all repositories for the user based on search_query
    const response = await axios({
        method: 'get',
        // url: `https://api.github.com/user/repos?q='P_PAY'`,
        url: `https://api.github.com/search/repositories?q=${search_query}+user:${user.data.login}`,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${githubAuthToken}`,
        },
        params: {
            per_page: 1000,
        },
    });

    // select only name and clone_url from response
    const repositories = await response.data.items.map((item) => {
        item.clone_url = item.clone_url.replace(
            'https://',
            'https://' + githubAuthToken + '@'
        );
        return { name: item.name, clone_url: item.clone_url };
    });

    res.json({
        repositories,
    });
};

const getRepositories = async (req, res) => {
    const { githubAuthToken } = req.params;

    // check if githubAuthToken1 is provided
    if (!githubAuthToken) {
        throw new BadRequestError('Please provide githubAuthToken');
    }

    //  get all user repositories
    const response = await axios({
        method: 'get',
        url: `https://api.github.com/user/repos`,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${githubAuthToken}`,
        },
        params: {
            per_page: 1000,
        },
    });

    // select only name and clone_url from response
    const repositories = await response.data.map((item) => {
        item.clone_url = item.clone_url.replace(
            'https://',
            'https://' + githubAuthToken + '@'
        );
        return { repo_name: `${item.owner.login}-${item.name}`, clone_url: item.clone_url, name: item.name };
    });

    // return repositories
    res.json({
        repositories,
    });
};

module.exports = {
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
    getSearchRepositories,
    getRepositories,
};
