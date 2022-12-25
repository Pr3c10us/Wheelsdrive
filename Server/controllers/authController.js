// Import required modules
require('dotenv').config();
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT
const storage = require('node-persist');

// Import errors
const { BadRequestError } = require('../errors');
// Import the DynamoDB Document Client and Table Name
const { dynamoClient, TABLE_NAME } = require('../aws/dynamo');
const { ses } = require('../aws/ses');

const verifyEmail = async (req, res) => {
    // Init storage
    await storage.init();
    // get user info
    let { email, password, username, firstname, lastname } = req.body;

    // Capitalize usernae
    username = username.toUpperCase();

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
        await storage.clear();
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
        await storage.clear();
        throw new BadRequestError('Email address already exist');
    }

    const user = {
        firstname,
        lastname,
        username,
        email,
        password,
    };

    // store user in local storage

    // check if user exist
    const userExist = await storage.getItem(username);
    if (userExist) {
        await storage.clear();
        throw new BadRequestError('Username not available');
    }
    await storage.setItem(username, user);

    // Generate a random 6-digit verification code
    let code = Math.floor(Math.random() * 900000) + 100000;
    code = code.toString();

    // Set the expiration time to 10 minutes from now
    const expiration = Date.now() + 1000 * 60 * 1;

    await storage.setItem(`${username}-code`, { code, expiration });

    // Send the verification code to the user's email address
    const params = {
        Source: 'ptowolabi@student.oauife.edu.ng',
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Data: 'Verification Code',
            },
            Body: {
                Html: {
                    Data: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  text-align: center;
                }
                .code {
                  font-size: 48px;
                  color: #3c3c3c;
                  margin-bottom: 24px;
                }
                .expiration {
                  font-size: 18px;
                  color: #999;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="code">${code}</div>
                <div class="expiration">This code will expire in 10 minutes.</div>
              </div>
            </body>
          </html>
        `,
                },
            },
        },
    };
    const response = await ses.sendEmail(params).promise();
    // error handling
    if (response.$response.error) {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        throw new BadRequestError('Error sending verification code');
    }
    console.log(await storage.getItem(`${username}-code`));

    res.json({
        msg: 'Verification code has been sent to your email address',
    });
};

const sendCode = async (req, res) => {
    // get username from params
    const { username } = req.params;
    if (!username) {
        throw new BadRequestError('Username is required');
    }

    // init storage
    await storage.init();

    // check if username exist
    const user = await storage.getItem(username.toUpperCase());
    if (!user) {
        throw new BadRequestError('User not found');
    }

    // Generate a random 6-digit verification code
    let code = Math.floor(Math.random() * 900000) + 100000;
    code = code.toString();

    // Set the expiration time to 10 minutes from now
    const expiration = Date.now() + 1000 * 60 * 1;

    await storage.setItem(`${username.toUpperCase()}-code`, {
        code,
        expiration,
    });

    // Send the verification code to the user's email address
    const params = {
        Source: 'ptowolabi@student.oauife.edu.ng',
        Destination: {
            ToAddresses: [user.email],
        },
        Message: {
            Subject: {
                Data: 'Verification Code',
            },
            Body: {
                Html: {
                    Data: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  text-align: center;
                }
                .code {
                  font-size: 48px;
                  color: #3c3c3c;
                  margin-bottom: 24px;
                }
                .expiration {
                  font-size: 18px;
                  color: #999;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="code">${code}</div>
                <div class="expiration">This code will expire in 10 minutes.</div>
              </div>
            </body>
          </html>
        `,
                },
            },
        },
    };
    const response = await ses.sendEmail(params).promise();
    // error handling
    if (response.$response.error) {
        throw new BadRequestError('Error sending verification code');
    }

    console.log(await storage.getItem(`${username.toUpperCase()}-code`));

    res.json({
        msg: 'New verification code has been sent to your email address',
    });
};

const signup = async (req, res) => {
    await storage.init();

    let { email, password, username, firstname, lastname } =
        await storage.getItem(req.body.username.toUpperCase());

    if (!req.body.code) {
        throw new BadRequestError('code not provided');
    }
    // check if code is provided
    const storedCode = await storage.getItem(
        `${req.body.username.toUpperCase()}-code`
    );
    if (!storedCode) {
        throw new BadRequestError('Code has expired');
    }
    // Check if the code has expired
    if (Date.now() > storedCode.expiration) {
        // delete user from local storage
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        // Code has expired
        throw new BadRequestError('Code has expired');
    }

    // Check if the code is correct
    if (storedCode.code !== req.body.code) {
        throw new BadRequestError('Code provided is incorrect');
    }

    // check if username exist again in case it was taken while user was verifying email
    const usernameParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'username = :username ',
        ExpressionAttributeValues: {
            ':username': username,
        },
    };
    const usernameTaken = await dynamoClient.scan(usernameParams).promise();
    if (usernameTaken.Items && usernameTaken.Items.length > 0) {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        throw new BadRequestError('Username Taken');
    }
    // check if email exist again in case it was taken while user was verifying email
    const emailParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email ',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const emailTaken = await dynamoClient.scan(emailParams).promise();
    if (emailTaken.Items && emailTaken.Items.length > 0) {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        throw new BadRequestError('Email address already exist');
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // create user
    const user = {
        firstname,
        lastname,
        accountVerified: false,
        username,
        email,
        password,
        authorizedGithub: false,
        githubAuthToken: '',
    };
    const params = {
        TableName: TABLE_NAME,
        Item: user,
    };
    await dynamoClient.put(params).promise();

    // delete user from local storage
    await storage.removeItem(req.body.username.toUpperCase());
    await storage.removeItem(`${req.body.username.toUpperCase()}-code`);

    res.json({
        msg: 'Account Sucessfully Created',
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Missing email or password');
    }

    // check if email exist
    const emailParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email ',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const user = await dynamoClient.scan(emailParams).promise();

    if (user.Items.length === 0) {
        throw new BadRequestError('Email address does not exist');
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.Items[0].password);
    if (!isMatch) {
        throw new BadRequestError('Wrong password');
    }

    // create jwt
    const payload = {
        username: user.Items[0].username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.cookie('token', token, {
        signed: true,
        maxAge: 60 * 60 * 24,
        httpOnly: false,
    }).json({
        msg: 'Login Sucessful',
    });
};

const logout = (req, res) => {
    res.clearCookie('token').json({
        msg: 'Logout Sucessful',
    });
};

module.exports = {
    signup,
    login,
    logout,
    verifyEmail,
    sendCode,
};
