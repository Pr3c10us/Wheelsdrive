const CustomError = require("./customError");

class BadRequestError extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = 400;
    }
}

module.exports = BadRequestError;
