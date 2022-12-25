const params = async () => {
    // check if username exist
    const usernameParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'username = :username ',
        ExpressionAttributeValues: {
            ':username': username,
        },
    };
    const usernameTaken = await dynamoClient.scan(usernameParams).promise();
    if (usernameTaken.Items && usernameTaken.Items.length > 0) {
        throw new BadRequestError('Username Taken');
    }
    // check if email exist
    const emailParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email ',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const emailTaken = await dynamoClient.scan(emailParams).promise();
    if (emailTaken.Items && emailTaken.Items.length > 0) {
        throw new BadRequestError('Email address already exist');
    }
    const tempUsernameParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'username = :username ',
        ExpressionAttributeValues: {
            ':username': username,
        },
    };
    const tempUsernameTaken = await dynamoClient
        .scan(tempUsernameParams)
        .promise();
    if (tempUsernameTaken.Items && tempUsernameTaken.Items.length > 0) {
        throw new BadRequestError('Username Taken');
    }
    // check if email exist again in case it was taken while user was verifying email
    const tempEmailParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email ',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const tempEmailTaken = await dynamoClient.scan(tempEmailParams).promise();
    if (tempEmailTaken.Items && tempEmailTaken.Items.length > 0) {
        throw new BadRequestError('Email address already exist');
    }
};

module.exports = {
    params,
};
