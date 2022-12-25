const CustomError = require('./customError');

class UnAuthorizedError extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = 401;
    }
}

module.exports = UnAuthorizedError;
