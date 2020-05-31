const express = require('express');
const os = require('os');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const practiceController = require('./controllers/practiceController.js');

const port = process.env.PORT || 3000;
const interfaces = os.networkInterfaces();

let usableInterfaces = {};

for (const name in interfaces) {
    let foundInterfaces = interfaces[name].find(i => {
        return i.family === 'IPv4' && i.internal === false;
    });

    if (foundInterfaces) usableInterfaces[name] = foundInterfaces;
}

const app = express();
// app.use(morgan['dev']);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', practiceController);

mongoose.connect('mongodb://localhost:27017/practice');
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Error connecting to DB: ', err);
});

db.once('open', () => {
    console.log("DB connection open");
    app.listen(port, () => {

        console.log(`Listening on http://127.0.0.1:${port}`);

        for (let i in usableInterfaces) {
            console.log(`http://${usableInterfaces[i].address}:${port}`);
        };
    });
})