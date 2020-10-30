const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    googleAuthConfig: {
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        redirect: process.env.REDIRECT
    },
    cookieTimeout: process.env.COOKIE_TIMEOUT,
    timeout: process.env.CONNECTION_TIMEOUT,
    cors: process.env.CORS ?? null,

    db_connection: process.env.DB_CONNECTION,
    port: process.env.PORT,
    cookieKey: process.env.COOKIEKEY,
    authMode: process.env.AUTH_MODE ?? "google",
    users: process.env.USERS ?? [],
    apiKey: process.env.APIKEY
}