const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const addRequestId = require('express-request-id')();
const config = require('config');
const routes = require('./routes/index');
const errorHandler = require('./handlers/ErrorHandler');
const authController = require('./controllers/AuthController');
const logger = require('./utils/logger');

const app = express();
const {
    catchErrors,
} = errorHandler;

app.use(addRequestId);
app.use(bodyParser.json({
    extended: true,
}));

app.get('/health', (req, res) => {
    res.status(200).send();
});

morgan.token('id', req => req.id);

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
}));

app.use(morgan(loggerFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
}));

app.use((req, res, next) => {
    logger.logCustomRequest(req);
    next();
});

/**
 * Service name should be substituted for 'ga-template' in path
 */
app.use('/api/ga-template/v1',
    catchErrors(authController.validateUser),
    routes);

app.use(errorHandler.notFound);

app.use(errorHandler.accessControlExpiredTokenError);

app.use(errorHandler.accessControlNotFoundError);

app.use(errorHandler.accessControlUnAuthorizedError);

if (config.environment === 'development') {
    app.use(errorHandler.developmentErrors);
}

app.use(errorHandler.productionErrors);

module.exports = app;
