const { CustomError } = require('../errors');

const errHandler = async (error, req, res, next) => {
    console.log(error);
    if (error instanceof CustomError) {
        return res.status(error.status).json({ msg: error.message });
    }
    return res.status(500).json({ msg: 'Internal Server Error' });
};

module.exports = errHandler;
