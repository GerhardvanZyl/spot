const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PracticeProvider = require('./practice-provider');
const Practice = require('../model/practice');

// cater for downloading mongo memory server
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

describe('PracticeProvider', () => {

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

    describe('save', () => {
        it('should save one practice item at a time.', async () => {
            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice1);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult[0].practiceName).toEqual(sourcePractice1.practiceName);
            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
            expect(retrievalResult[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(retrievalResult[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(retrievalResult[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(retrievalResult[0].address.city).toEqual(sourcePractice1.address.city);
            expect(retrievalResult[0].address.province).toEqual(sourcePractice1.address.province);
            expect(retrievalResult[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);
        });
    });

    describe('retrieveAll', () => {
        it('should retrive a single practice item if there is only one.', async () => {
            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice1);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult.length).toEqual(1);
            expect(retrievalResult[0].practiceName).toEqual(sourcePractice1.practiceName);
            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
            expect(retrievalResult[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(retrievalResult[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(retrievalResult[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(retrievalResult[0].address.city).toEqual(sourcePractice1.address.city);
            expect(retrievalResult[0].address.province).toEqual(sourcePractice1.address.province);
            expect(retrievalResult[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);
        });

        it('should retrive a multiple practice items if there many.', async () => {
            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice1);
            await practiceProvider.save(sourcePractice2);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult.length).toEqual(2);
            expect(retrievalResult[0].practiceName).toEqual(sourcePractice1.practiceName);
            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
            expect(retrievalResult[0].address.line1).toEqual(sourcePractice1.address.line1);
            expect(retrievalResult[0].address.line2).toEqual(sourcePractice1.address.line2);
            expect(retrievalResult[0].address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(retrievalResult[0].address.city).toEqual(sourcePractice1.address.city);
            expect(retrievalResult[0].address.province).toEqual(sourcePractice1.address.province);
            expect(retrievalResult[0].address.postalCode).toEqual(sourcePractice1.address.postalCode);

            expect(retrievalResult[1].practiceName).toEqual(sourcePractice2.practiceName);
            expect(retrievalResult[1].emailAddresses[0].value).toEqual(sourcePractice2.emailAddresses[0].value);
            expect(retrievalResult[1].phoneNumbers[0].value).toEqual(sourcePractice2.phoneNumbers[0].value);
            expect(retrievalResult[1].address.line1).toEqual(sourcePractice2.address.line1);
            expect(retrievalResult[1].address.line2).toEqual(sourcePractice2.address.line2);
            expect(retrievalResult[1].address.suburb).toEqual(sourcePractice2.address.suburb);
            expect(retrievalResult[1].address.city).toEqual(sourcePractice2.address.city);
            expect(retrievalResult[1].address.province).toEqual(sourcePractice2.address.province);
            expect(retrievalResult[1].address.postalCode).toEqual(sourcePractice2.address.postalCode);
        });

        it('should retrive all email addresses and phone numbers for the practice.', async () => {
            let practiceProvider = new PracticeProvider();

            await practiceProvider.save(sourcePractice3);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice3.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice3.phoneNumbers[0].value);
            expect(retrievalResult[0].emailAddresses[1].value).toEqual(sourcePractice3.emailAddresses[1].value);
            expect(retrievalResult[0].phoneNumbers[1].value).toEqual(sourcePractice3.phoneNumbers[1].value);
        });

        it('should return an empty array if there are none', async () => {
            let practiceProvider = new PracticeProvider();

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult).toBeDefined();
            expect(retrievalResult.length).toEqual(0);
        });
    });

    describe('findById', ()=>{
        it('should return the practice matching a specific id', async ()=>{
            let practiceProvider = new PracticeProvider();

            const save1 = await practiceProvider.save(sourcePractice1);
            const save2 = await practiceProvider.save(sourcePractice2);
            const save3 = await practiceProvider.save(sourcePractice3);

            // query out of order 
            let retrievalResult2 = await practiceProvider.findById(save2.id);
            let retrievalResult1 = await practiceProvider.findById(save1.id);
            let retrievalResult3 = await practiceProvider.findById(save3.id);

            expect(retrievalResult1.practiceName).toEqual(sourcePractice1.practiceName);
            expect(retrievalResult1.emailAddresses[0].value).toEqual(sourcePractice1.emailAddresses[0].value);
            expect(retrievalResult1.phoneNumbers[0].value).toEqual(sourcePractice1.phoneNumbers[0].value);
            expect(retrievalResult1.address.line1).toEqual(sourcePractice1.address.line1);
            expect(retrievalResult1.address.line2).toEqual(sourcePractice1.address.line2);
            expect(retrievalResult1.address.suburb).toEqual(sourcePractice1.address.suburb);
            expect(retrievalResult1.address.city).toEqual(sourcePractice1.address.city);
            expect(retrievalResult1.address.province).toEqual(sourcePractice1.address.province);
            expect(retrievalResult1.address.postalCode).toEqual(sourcePractice1.address.postalCode);

            expect(retrievalResult2.practiceName).toEqual(sourcePractice2.practiceName);
            expect(retrievalResult2.emailAddresses[0].value).toEqual(sourcePractice2.emailAddresses[0].value);
            expect(retrievalResult2.phoneNumbers[0].value).toEqual(sourcePractice2.phoneNumbers[0].value);
            expect(retrievalResult2.address.line1).toEqual(sourcePractice2.address.line1);
            expect(retrievalResult2.address.line2).toEqual(sourcePractice2.address.line2);
            expect(retrievalResult2.address.suburb).toEqual(sourcePractice2.address.suburb);
            expect(retrievalResult2.address.city).toEqual(sourcePractice2.address.city);
            expect(retrievalResult2.address.province).toEqual(sourcePractice2.address.province);
            expect(retrievalResult2.address.postalCode).toEqual(sourcePractice2.address.postalCode);

            expect(retrievalResult3.practiceName).toEqual(sourcePractice3.practiceName);
            expect(retrievalResult3.emailAddresses[0].value).toEqual(sourcePractice3.emailAddresses[0].value);
            expect(retrievalResult3.phoneNumbers[0].value).toEqual(sourcePractice3.phoneNumbers[0].value);
            expect(retrievalResult3.address.line1).toEqual(sourcePractice3.address.line1);
            expect(retrievalResult3.address.line2).toEqual(sourcePractice3.address.line2);
            expect(retrievalResult3.address.suburb).toEqual(sourcePractice3.address.suburb);
            expect(retrievalResult3.address.city).toEqual(sourcePractice3.address.city);
            expect(retrievalResult3.address.province).toEqual(sourcePractice3.address.province);
            expect(retrievalResult3.address.postalCode).toEqual(sourcePractice3.address.postalCode);
        });

    });
});