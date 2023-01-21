const CustomError = require('./customError');

class NotFoundError extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = 404;
    }
}

module.exports = NotFoundError;
