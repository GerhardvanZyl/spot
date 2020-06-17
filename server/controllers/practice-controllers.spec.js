
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
        emailAddresses: [{ value: 'a@b.com' }],
        phoneNumbers: [{ value: '011565854' }],
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
        emailAddresses: [{ value: 'a2@b.com' }],
        phoneNumbers: [{ value: '0115265854' }],
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
        emailAddresses: [{ value: 'a@b.com' }, { value: 'ac@b.com' }],
        phoneNumbers: [{ value: '011565854' }, { value: '011565856' }],
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
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
            expect(response[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(response[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(response[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(response[0].address.city).toEqual(sourcePractice1.address.city);
            expect(response[0].address.province).toEqual(sourcePractice1.address.province);
            expect(response[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);

            expect(response[1].name).toEqual(sourcePractice2.name);
            expect(response[1].emailAddresses[0].value).toEqual(sourcePractice2.emailAddresses[0].value);
            expect(response[1].phoneNumbers[0].value).toEqual(sourcePractice2.phoneNumbers[0].value);
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
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
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
            
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice3.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice3.phoneNumbers[0].value);
            expect(response[0].emailAddresses[1].value).toEqual(sourcePractice3.emailAddresses[1].value);
            expect(response[0].phoneNumbers[1].value).toEqual(sourcePractice3.phoneNumbers[1].value);
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

            await request(server.app).post('/api/practice').send(sourcePractice1);

            const response = await practiceProvider.retrieveAll();

            expect(response.length).toEqual(1);
            expect(response[0].name).toEqual(sourcePractice1.name);
            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
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

            expect(response[0].emailAddresses[0].value).toEqual(sourcePractice3.emailAddresses[0].value);
            expect(response[0].phoneNumbers[0].value).toEqual(sourcePractice3.phoneNumbers[0].value);
            expect(response[0].emailAddresses[1].value).toEqual(sourcePractice3.emailAddresses[1].value);
            expect(response[0].phoneNumbers[1].value).toEqual(sourcePractice3.phoneNumbers[1].value);
        });
    });
});