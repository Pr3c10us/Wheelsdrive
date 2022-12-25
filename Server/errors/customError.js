class CustomError extends Error {
    constructor(msg) {
        super(msg);
        this.status = 500;
    }
}

module.exports = CustomError;
