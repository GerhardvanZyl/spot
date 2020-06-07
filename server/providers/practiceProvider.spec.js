const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PracticeProvider = require('./practiceProvider');
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
            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }],
                phoneNumbers: [{ value: '011565854' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(retrievalResult[0].address.value).toEqual(sourcePractice.address.value);
        });
    });

    describe('retrieveAll', () => {
        it('should retrive a single practice item if there is only one.', async () => {
            let practiceProvider = new PracticeProvider();
            const sourcePractice = {
                _id: '507f191e810c19729de860ea',
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }],
                phoneNumbers: [{ value: '011565854' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult.length).toEqual(1);
            expect(retrievalResult[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(retrievalResult[0].address.value).toEqual(sourcePractice.address.value);
        });

        it('should retrive a multiple practice items if there many.', async () => {
            let practiceProvider = new PracticeProvider();
            const sourcePractice = {
                _id: '507f191e810c19729de860ea',
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }],
                phoneNumbers: [{ value: '011565854' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            const sourcePractice2 = {
                _id: '507f191e810c12729de860ea',
                practiceName: 'oli2',
                emailAddresses: [{ value: 'c@b.com' }],
                phoneNumbers: [{ value: '011565855' }],
                address: { value: '43 imola heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);
            await practiceProvider.save(sourcePractice2);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult.length).toEqual(2);
            expect(retrievalResult[0].practiceName).toEqual(sourcePractice.practiceName);
            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(retrievalResult[0].address.value).toEqual(sourcePractice.address.value);

            expect(retrievalResult[1].practiceName).toEqual(sourcePractice2.practiceName);
            expect(retrievalResult[1].emailAddresses[0].value).toEqual(sourcePractice2.emailAddresses[0].value);
            expect(retrievalResult[1].phoneNumbers[0].value).toEqual(sourcePractice2.phoneNumbers[0].value);
            expect(retrievalResult[1].address.value).toEqual(sourcePractice2.address.value);
        });

        it('should retrive all email addresses and phone numbers for the practice.', async () => {
            let practiceProvider = new PracticeProvider();
            const sourcePractice = {
                _id: '507f191e810c19729de860ea',
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }, { value: 'ac@b.com' }],
                phoneNumbers: [{ value: '011565854' }, { value: '011565856' }],
                address: { value: '43 pecan heights, 39 cockspur rd, weltevredenpark, 1085' }
            };

            await practiceProvider.save(sourcePractice);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult[0].emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(retrievalResult[0].phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(retrievalResult[0].emailAddresses[1].value).toEqual(sourcePractice.emailAddresses[1].value);
            expect(retrievalResult[0].phoneNumbers[1].value).toEqual(sourcePractice.phoneNumbers[1].value);
        });

        it('should return an empty array if there are none', async () => {
            let practiceProvider = new PracticeProvider();

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult).toBeDefined();
            expect(retrievalResult.length).toEqual(0);
        });
    });
});