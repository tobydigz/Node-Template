const logger = require('../utils/logger');
/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in catchErrors(),
  catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.notFound = (_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

exports.accessControlNotFoundError = (err, req, res, next) => {
    if (err.name === 'StatusCodeError' && err.statusCode === 404) {
        const statusCode = 403;
        const response = {
            code: 'A02',
            message: `${err.error.responseCode}`,
        };

        logger.logCustomError(req.id, response, statusCode);
        res.status(403).send(response);
        return;
    }
    next(err);
};

exports.accessControlUnAuthorizedError = (err, req, res, next) => {
    if (err.name === 'StatusCodeError' && err.statusCode === 401) {
        const statusCode = 403;
        const response = {
            code: 'A01',
            message: `${err.error.error}: ${err.error.message}`,
        };

        logger.logCustomError(req.id, response, statusCode);
        res.status(403).send(response);
        return;
    }
    next(err);
};

exports.accessControlExpiredTokenError = (err, req, res, next) => {
    if (err.name === 'StatusCodeError' && err.statusCode === 500) {
        const statusCode = 403;
        const response = {
            code: 'A03',
            message: `${err.error.responseCode}`,
        };

        logger.logCustomError(req.id, response, statusCode);
        res.status(403).send(response);
        return;
    }
    next(err);
};


/*
  Development Error Handler

  In development we show good error messages
  so if we hit a syntax error or any other previously un-handled error,
  we can show good info on what happened
*/
// eslint-disable-next-line no-unused-vars
exports.developmentErrors = (err, req, res, next) => {
    const errorStack = err.stack || '';
    const errorDetails = {
        message: err.message,
        code: err.status,
        stackHighlighted: errorStack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
    };
    logger.logError(err, req.id);
    res.status(err.status || 500).send(errorDetails);
};


/*
  Production Error Handler

  No stacktraces are leaked to user
*/
// eslint-disable-next-line no-unused-vars
exports.productionErrors = (err, req, res, next) => {
    logger.logError(err, req.id);
    res.status(err.status || 500).send(err);
};
