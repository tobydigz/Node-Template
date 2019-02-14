module.exports = {
    environment: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    ACCESS_CONTROL_URL: process.env.ACCESS_CONTROL_URL || 'https://sandbox.globalaccelerex.com',
    ACCESS_CONTROL_USER: process.env.ACCESS_CONTROL_USER || '',
    ACCESS_CONTROL_PASSWORD: process.env.ACCESS_CONTROL_PASSWORD || '',
    ACCESS_CONTROL_PASSWORD_SSM: process.env.ACCESS_CONTROL_PASSWORD_SSM || '',
    AWS_REGION: process.env.AWS_REGION || 'eu-west-1',
};
