
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PracticeProvider = require('../providers/practiceProvider');
const request = require('supertest');
const server = require('../app');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

describe('PracticeController', () => {

    let mongoServer;
    let connection;

    const mmsOptions = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getConnectionString();
        await mongoose.connect(mongoUri, mmsOptions, (err)=>{
            if(err) console.error(err);
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
      });

      beforeEach(async () => {
        await mongoose.connection.collection('practice').deleteMany({});
    });

    describe('get', () => {
        it('should return all values', async () => {
            let practiceProvider = new PracticeProvider();
            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }],
                phoneNumbers: [{ value: '011565854' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            let saveResult = await practiceProvider.save(sourcePractice);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(response[0].address.value).toEqual(sourcePractice.address.value);
        });
    });

    describe('a', () => {
        it('a', () => {
            expect(true).toBeTruthy();
        });
    });
});