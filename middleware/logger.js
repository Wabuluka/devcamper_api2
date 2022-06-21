// @desc    Logs URL description to console
const logger = (req, res, next) => {
    req.hello = `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log(req.hello)
    next();
}


module.exports = logger;