const { ses } = require('../aws/ses');

const params = async (email, code) => {
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
    return response;
};

module.exports = {
    params,
};
