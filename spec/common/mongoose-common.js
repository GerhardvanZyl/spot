const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

console.log('Initializing Mongo unit test helpers...');

// cater for downloading mongo memory server
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

mongoose.Promise = Promise;
const connectOrig = mongoose.connect;

mongoose.connect = (async ()=>{
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString(true);

    await connectOrig.call(mongoose, mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

    console.log('Mongoose awaited connected');

    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected/opened to ${mongoUri} `);
    });

    mongoose.connection.once('disconnected', ()=>{
        console.log('MongoDB disconnected. Stopping...');
        mongoServer.stop();
    });

    mongoose.connection.on('error', (e)=>{
        if(e.message.code === 'ETIMEDOUT'){
            console.error(e);
        } else {
            throw e;
        }
    });
});

module.exports = mongoose;

