/* eslint-disable no-console */
const config = require('config');
const AWS = require('aws-sdk');

AWS.config.update({
    region: config.AWS_REGION,
});
AWS.config.setPromisesDependency(null);
const ssm = new AWS.SSM({
    apiVersion: '2014-11-06',
});


const accessControlPasswordKey = config.ACCESS_CONTROL_PASSWORD_SSM;
let accessControlPassword = config.ACCESS_CONTROL_PASSWORD;

exports.loadAccessControlPassword = async () => {
    const params = {
        Name: accessControlPasswordKey,
        WithDecryption: true,
    };

    try {
        const data = await ssm.getParameter(params).promise();
        accessControlPassword = data.Parameter.Value;
    } catch (error) {
        console.warn('Error loading Access Control password from SSM relying on fallback password');
        if (config.environment === 'production') {
            process.exit(1);
        }
    }
    global.accessControlPassword = accessControlPassword;
};
