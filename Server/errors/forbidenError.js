const CustomError = require('./customError');

class ForbidenError extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = 403;
    }
}

module.exports = ForbidenError;
