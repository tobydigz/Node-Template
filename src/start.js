/* eslint-disable no-console */
// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
    console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t You\'re on an older version of node that doesn\'t support some features this app uses (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
    process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({
    path: '.env',
});

// Start our app!
const app = require('./app');
const secret = require('./secrets');

app.set('port', process.env.PORT || 8081);
const server = app.listen(app.get('port'), async () => {
    await secret.loadAccessControlPassword();
    console.log(`Express running → PORT ${server.address().port}`);
});
