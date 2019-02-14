exports.validateUser = (req, res, next) => {
    const {
        isValid,
    } = req.body;
    if (isValid) {
        return next();
    }
    return res.status(401).send({
        message: 'Unauthorized',
    });
};
