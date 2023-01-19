const { CustomError } = require('../errors');
const storage = require('node-persist');

const errHandler = async (error, req, res, next) => {
    await storage.init();

    if (error instanceof CustomError) {
        return res.status(error.status).json({ msg: error.message });
    }
    if (error.code === 'ConditionalCheckFailedException') {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        return res.status(400).json({ msg: 'Verification of email Failed' });
    }
    if (error.code === 'MessageRejected') {
        await storage.removeItem(req.body.username.toUpperCase());
        await storage.removeItem(`${req.body.username.toUpperCase()}-code`);
        return res.status(400).json({ msg: 'Verification of email Failed' });
    }
    console.log(error);
    console.log(error.code);

    return res.status(500).json({ msg: 'Internal Server Error' });
};

module.exports = errHandler;
