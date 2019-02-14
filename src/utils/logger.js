const bunyan = require('bunyan');
const config = require('config');
const reqSerializer = require('bunyan-express-serializer');

const {
    logLevel,
} = config;

bunyan.createLogger({
    name: 'transaction-notifier',
    serializers: {
        req: reqSerializer,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err,
    },
    level: logLevel,
});

exports.log = bunyan;

exports.logCheckStatusResponse = (id, body, statusCode, fromCache) => {
    const log = this.log.child({
        id,
        body,
        statusCode,
        fromCache,
    }, true);

    log.info('response');
};

exports.logNotify = (id, body, statusCode) => {
    const log = this.log.child({
        id,
        body,
        statusCode,
    }, true);

    log.info('response');
};

exports.logCustomRequest = (req) => {
    const log = this.log.child({
        id: req.id,
        body: req.body,
    }, true);
    log.info({
        req,
    });
};

exports.logCustomError = (id, body, statusCode) => {
    const log = this.log.child({
        id,
        body,
        statusCode,
    }, true);

    log.info('response');
};

exports.logGenericError = (err, id) => {
    const log = this.log.child({
        id,
    }, true);
    log.error({
        err,
    });
};
