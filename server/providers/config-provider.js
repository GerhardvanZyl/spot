const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    googleAuthConfig: {
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        redirect: process.env.REDIRECT
    },
    db_connection: process.env.DB_CONNECTION,
    port: process.env.PORT
}