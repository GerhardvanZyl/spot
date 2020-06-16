
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PracticeProvider = require('../providers/practiceProvider');
const Practice = require('../model/practice');
const request = require('supertest');
const server = require('../app');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

describe('PracticeController', () => {

    let mongoServer;

    const mmsOptions = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE
    };

    const stopMongoose = async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    }

    const startMongoose = async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getConnectionString();
        await mongoose.connect(mongoUri, mmsOptions, (err) => {
            if (err) console.error(err);
        });
    }

    beforeAll(async () => {
        await startMongoose();
    });

    afterAll(async() => {
        await stopMongoose();
    });

    beforeEach(async (done) => {
        Practice.remove({}).exec(() => {
            done();
        });
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

            let sourcePractice2 = {
                practiceName: 'oli2',
                emailAddresses: [{ value: 'a2@b.com' }],
                phoneNumbers: [{ value: '0115265854' }],
                address: { value: '432 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);
            await practiceProvider.save(sourcePractice2);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response.length).toEqual(2);
            expect(response[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(response[0].address.value).toEqual(sourcePractice.address.value);

            expect(response[1].practiceName).toEqual(sourcePractice2.practiceName);
            expect(response[1].emailAddresses[0].value).toEqual(sourcePractice2.emailAddresses[0].value);
            expect(response[1].phoneNumbers[0].value).toEqual(sourcePractice2.phoneNumbers[0].value);
            expect(response[1].address.value).toEqual(sourcePractice2.address.value);
        });

        it('should return one if there is only one entry.', async ()=>{

            let practiceProvider = new PracticeProvider();
            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }],
                phoneNumbers: [{ value: '011565854' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response.length).toEqual(1);
            expect(response[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(response[0].address.value).toEqual(sourcePractice.address.value);
        });

        it('should retrive all email addresses and phone numbers for the practice.', async ()=>{

            let practiceProvider = new PracticeProvider();
            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }, { value: 'ac@b.com' }],
                phoneNumbers: [{ value: '011565854' }, { value: '011565856' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;
            
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(response[0].emailAddresses[1].value).toEqual(sourcePractice.emailAddresses[1].value);
            expect(response[0].phoneNumbers[1].value).toEqual(sourcePractice.phoneNumbers[1].value);
        });

        it('should return an empty array if there are none', async () => {

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response.length).toEqual(0);
        });
    });

    describe('post', ()=>{
        it('should save a single value', async ()=>{

            let practiceProvider = new PracticeProvider();

            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }, { value: 'ac@b.com' }],
                phoneNumbers: [{ value: '011565854' }, { value: '011565856' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await request(server.app).post('/api/practice').send(sourcePractice);

            const response = await practiceProvider.retrieveAll();

            expect(response.length).toEqual(1);
            expect(response[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(response[0].address.value).toEqual(sourcePractice.address.value);

        });

        it('should save multiple email and phone numbers for a practice', async ()=>{
            let practiceProvider = new PracticeProvider();

            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }, { value: 'ac@b.com' }],
                phoneNumbers: [{ value: '011565854' }, { value: '011565856' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await request(server.app).post('/api/practice').send(sourcePractice);

            const response = await practiceProvider.retrieveAll();

            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(response[0].emailAddresses[1].value).toEqual(sourcePractice.emailAddresses[1].value);
            expect(response[0].phoneNumbers[1].value).toEqual(sourcePractice.phoneNumbers[1].value);
        });
    });
});