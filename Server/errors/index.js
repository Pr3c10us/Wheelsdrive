const CustomError = require('./customError');
const BadRequestError = require('./badReqError');
const UnAuthorizedError = require('./unAuthError');
const ForbidenError = require('./forbidenError');
const NotFoundError = require('./notFoundError');

module.exports = {
    BadRequestError,
    CustomError,
    UnAuthorizedError,
    ForbidenError,
    NotFoundError,
};
