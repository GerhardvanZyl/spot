const express = require('express');
const os = require('os');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const practiceController = require('./controllers/practice-controller.js');
const patientController = require('./controllers/patient-controller.js');
const authenticationController = require('./controllers/authentication-controller.js');
const cors = require('cors');
const config = require('./providers/config-provider.js');
const path = require('path');
const passport = require('passport');
const authProvider = require('./providers/auth-povider.js');
const cookieSession = require('cookie-session');

//const LocalStrategy = require('passport-local');

const isUnitTesting = process.argv[1].indexOf('node_modules\\jest\\bin\\jest.js') > -1;
const port = config.port || 3000;

const app = express();
let listener;

startServer(app);

module.exports = {
    app: app,
    listener: listener
};

function startServer(app) {

console.log('start');

    app.use(cors({
        origin: [/localhost.+/,/vaaccs.com.+/]
    }));

    app.use(express.static(path.join(__dirname, 'wwwroot')));

    // app.use(morgan['dev']);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cookieSession({
        maxAge: 24*60*60*100,
        keys: [config.cookieKey]
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api/practice', practiceController);
    app.use('/api/patient', patientController);
    app.use('/authentication', authenticationController);

    app.get('/*', (req, res )=>{
        res.sendFile(__dirname + '/wwwroot/index.html');
    });

    connectDB();

    // Start server
    listener = app.listen(port, () => {
        listNetworkInterfaces();
    });
};

function connectDB() {
    // DB Connection - don't for unit tests
    if (!isUnitTesting) {
        mongoose.connect(config.db_connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.error('Error connecting to DB: ', err);
        });

        db.once('open', () => {
            console.log("DB connection open");
        });
    }
}

function listNetworkInterfaces() {

    const interfaces = os.networkInterfaces();

    let usableInterfaces = {};
    for (const name in interfaces) {
        let foundInterfaces = interfaces[name].find(i => {
            return i.family === 'IPv4' && i.internal === false;
        });

        if (foundInterfaces) usableInterfaces[name] = foundInterfaces;
    }

    console.log(`Listening on http://127.0.0.1:${port}`);
    for (let i in usableInterfaces) {
        console.log(`http://${usableInterfaces[i].address}:${port}`);
    };
}
