
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PracticeProvider = require('../providers/practice-provider');
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

    const sourcePractice1 = {
        name: 'oli',
        emailAddresses: ['a@b.com'],
        phoneNumbers: ['011565854'],
        address: {
            line1: 'unit 1',
            line2: '1 second street',
            suburb: 'suburbiana',
            city: 'cityvale',
            province: 'Status',
            postalCode: '1234'
        }
    };

    const sourcePractice2 = {
        name: 'oli2',
        emailAddresses: ['a2@b.com'],
        phoneNumbers: ['0115265854'],
        address: {
            line1: 'unit 2',
            line2: '2 second street',
            suburb: 'suburbia',
            city: 'cityville',
            province: 'provincia',
            postalCode: '3234'
        }
    };

    const sourcePractice3 = {
        name: 'oli3',
        emailAddresses: ['a@b.com', 'ac@b.com'],
        phoneNumbers: ['011565854', '011565856'],
        address: {
            line1: 'unit 3',
            line2: '3 second street',
            suburb: 'suburbia',
            city: 'cityville',
            province: 'provincia',
            postalCode: '3234'
        }
    };

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

            await practiceProvider.save(sourcePractice1);
            await practiceProvider.save(sourcePractice2);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response.length).toEqual(2);
            expect(response[0].name).toEqual(sourcePractice1.name);
            expect(response[0].emailAddresses[0]).toEqual(sourcePractice1.emailAddresses[0]);
            expect(response[0].phoneNumbers[0]).toEqual(sourcePractice1.phoneNumbers[0]);
            expect(response[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(response[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(response[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(response[0].address.city).toEqual(sourcePractice1.address.city);
            expect(response[0].address.province).toEqual(sourcePractice1.address.province);
            expect(response[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);

            expect(response[1].name).toEqual(sourcePractice2.name);
            expect(response[1].emailAddresses[0]).toEqual(sourcePractice2.emailAddresses[0]);
            expect(response[1].phoneNumbers[0]).toEqual(sourcePractice2.phoneNumbers[0]);
            expect(response[1].address.line1).toEqual(sourcePractice2.address.line1);
            expect(response[1].address.line2).toEqual(sourcePractice2.address.line2);
            expect(response[1].address.suburb).toEqual(sourcePractice2.address.suburb);
            expect(response[1].address.city).toEqual(sourcePractice2.address.city);
            expect(response[1].address.province).toEqual(sourcePractice2.address.province);
            expect(response[1].address.postalCode).toEqual(sourcePractice2.address.postalCode);
        });

        it('should return one if there is only one entry.', async ()=>{

            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice1);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response.length).toEqual(1);
            expect(response[0].name).toEqual(sourcePractice1.name);
            expect(response[0].emailAddresses[0]).toEqual(sourcePractice1.emailAddresses[0]);
            expect(response[0].phoneNumbers[0]).toEqual(sourcePractice1.phoneNumbers[0]);
            expect(response[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(response[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(response[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(response[0].address.city).toEqual(sourcePractice1.address.city);
            expect(response[0].address.province).toEqual(sourcePractice1.address.province);
            expect(response[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);
        });

        it('should retrive all email addresses and phone numbers for the practice.', async ()=>{

            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice3);

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;
            
            expect(response[0].emailAddresses[0]).toEqual(sourcePractice3.emailAddresses[0]);
            expect(response[0].phoneNumbers[0]).toEqual(sourcePractice3.phoneNumbers[0]);
            expect(response[0].emailAddresses[1]).toEqual(sourcePractice3.emailAddresses[1]);
            expect(response[0].phoneNumbers[1]).toEqual(sourcePractice3.phoneNumbers[1]);
        });

        it('should return an empty array if there are none', async () => {

            const responseObj = await request(server.app).get('/api/practice');
            const response = responseObj.body;

            expect(response.length).toEqual(0);
        });
    });

    describe('get:id', () => {
        it('should return the value with the specified Id', async () => {
            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice1);
            const source2 = await practiceProvider.save(sourcePractice2);

            const responseObj = await request(server.app).get(`/api/practice/id/${source2.id}`);
            const response = responseObj.body;

            expect(response.name).toEqual(sourcePractice2.name);
            expect(response.emailAddresses[0]).toEqual(sourcePractice2.emailAddresses[0]);
            expect(response.phoneNumbers[0]).toEqual(sourcePractice2.phoneNumbers[0]);
            expect(response.address.line1).toEqual(sourcePractice2.address.line1);
            expect(response.address.line2).toEqual(sourcePractice2.address.line2);
            expect(response.address.suburb).toEqual(sourcePractice2.address.suburb);
            expect(response.address.city).toEqual(sourcePractice2.address.city);
            expect(response.address.province).toEqual(sourcePractice2.address.province);
            expect(response.address.postalCode).toEqual(sourcePractice2.address.postalCode);
        });

        it('should return a 404 code if the specified Id was not found', async ()=>{

            let practiceProvider = new PracticeProvider();
            await practiceProvider.save(sourcePractice1);

            const responseObj = await request(server.app).get('/api/practice/id/5ee62f0935caf454f0d521e6');
            expect(responseObj.statusCode).toEqual(404);
        });
    });

    describe('post', ()=>{
        it('should save a single value', async ()=>{

            let practiceProvider = new PracticeProvider();

            await request(server.app).post('/api/practice').send(sourcePractice1);

            const response = await practiceProvider.retrieveAll();

            expect(response.length).toEqual(1);
            expect(response[0].name).toEqual(sourcePractice1.name);
            expect(response[0].emailAddresses[0]).toEqual(sourcePractice1.emailAddresses[0]);
            expect(response[0].phoneNumbers[0]).toEqual(sourcePractice1.phoneNumbers[0]);
            expect(response[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(response[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(response[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(response[0].address.city).toEqual(sourcePractice1.address.city);
            expect(response[0].address.province).toEqual(sourcePractice1.address.province);
            expect(response[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);

        });

        it('should save multiple email and phone numbers for a practice', async ()=>{
            let practiceProvider = new PracticeProvider();

            await request(server.app).post('/api/practice').send(sourcePractice3);

            const response = await practiceProvider.retrieveAll();

            expect(response[0].emailAddresses[0]).toEqual(sourcePractice3.emailAddresses[0]);
            expect(response[0].phoneNumbers[0]).toEqual(sourcePractice3.phoneNumbers[0]);
            expect(response[0].emailAddresses[1]).toEqual(sourcePractice3.emailAddresses[1]);
            expect(response[0].phoneNumbers[1]).toEqual(sourcePractice3.phoneNumbers[1]);
        });
    });
});