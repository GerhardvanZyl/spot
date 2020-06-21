const google = require('googleapis');
const config = require('../config-provider');

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

function createConnection(){
    return new google.oauth2_v2.createConnection(config.googleAuthConfig);
}

function getConnectionUrl(auth){
    return auth.generateAuthUrl({
        access_type:'offline',
        prompt:'consent',
        scope:defaultScope
    });
}

module.exports = function createClientGoogleUrl(){
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

