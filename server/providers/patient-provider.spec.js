const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PatientProvider = require('./patient-provider');
const Patient = require('../model/patient');

// cater for downloading mongo memory server
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

describe('PatientProvider', () => {

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

    const sourcePatient1 = {
        name: 'Spot',
        surname: 'Poggenpoel',
        isBloodDonor: true,
        bloodType: 'AB',
        practiceId: '5f3c26ab5611f9503c89c75a',
        lastBloodDonationDate: '2020-08-21T22:00:00.000+00:00',
        owners: [{
            firstName: 'Koos',
            surname: 'Poggenpoel',
            phoneNumbers: ['0215453652'],
            emailAddresses: ['koos@gmail.com'],
            address: {
                line1: 'unit 1',
                line2: '1 second street',
                suburb: 'suburbiana',
                city: 'cityvale',
                province: 'Status',
                postalCode: '1234'
            }
        }]
    };

    const sourcePatient2 = {
        name: 'Fido',
        surname: 'Smith',
        isBloodDonor: true,
        bloodType: 'BA',
        practiceId: '5f4ac05350b7fa5a0c724aee',
        lastBloodDonationDate: '2020-05-21T22:00:00.000+00:00',
        owners: [{
            firstName: 'Sanel',
            surname: 'Smith',
            phoneNumbers: ['0215453555'],
            emailAddresses: ['Sanel@gmail.com'],
            address: {
                line1: 'unit 2',
                line2: '2 second street',
                suburb: 'Radiokop',
                city: 'cityvaleVille',
                province: 'Gauteng',
                postalCode: '1235'
            }
        }]
    };

    const sourcePatient3 = {
        name: 'Sniffels',
        surname: 'Brown',
        isBloodDonor: true,
        bloodType: 'BA+',
        practiceId: '5f4abd8350b7fa5a0c724aeb',
        lastBloodDonationDate: '2020-04-21T22:00:00.000+00:00',
        owners: [{
            firstName: 'John',
            surname: 'Smithee',
            phoneNumbers: ['0115453555'],
            emailAddresses: ['John@gmail.com'],
            address: {
                line1: 'unit 3',
                line2: '3 second street',
                suburb: 'WeltevredenPark',
                city: 'Bloem',
                province: 'Freestate',
                postalCode: '1238'
            }
        }]
    };

    beforeAll(async () => {
        await startMongoose();
    });

    afterAll(async() => {
        await stopMongoose();
    });

    beforeEach(async (done) => {
        Patient.remove({}).exec(() => {
            done();
        });
    });

    describe('save', () => {
        it('should save one patient item at a time.', async () => {
            let patientProvider = new PatientProvider();

            await patientProvider.save(sourcePatient1);

            let retrievalResult = await patientProvider.retrieveAll();

            expect(retrievalResult[0].name).toEqual(sourcePatient1.name);
            expect(retrievalResult[0].surname).toEqual(sourcePatient1.surname);
            expect(retrievalResult[0].isBloodDonor).toEqual(sourcePatient1.isBloodDonor);
            expect(retrievalResult[0].bloodType).toEqual(sourcePatient1.bloodType);
            expect(retrievalResult[0].practiceId).toEqual(sourcePatient1.practiceId);
            expect(retrievalResult[0].lastBloodDonationdate).toEqual(sourcePatient1.lastBloodDonationdate);
            expect(retrievalResult[0].owners[0].firstName).toEqual(sourcePatient1.owners[0].firstName);
            expect(retrievalResult[0].owners[0].surname).toEqual(sourcePatient1.owners[0].surname);
            expect(retrievalResult[0].owners[0].emailAddresses[0]).toEqual(sourcePatient1.owners[0].emailAddresses[0]);
            expect(retrievalResult[0].owners[0].phoneNumbers[0]).toEqual(sourcePatient1.owners[0].phoneNumbers[0]);
            expect(retrievalResult[0].owners[0].address.line1).toEqual(sourcePatient1.owners[0].address.line1);
            expect(retrievalResult[0].owners[0].address.line2).toEqual(sourcePatient1.owners[0].address.line2);
            expect(retrievalResult[0].owners[0].address.suburb).toEqual(sourcePatient1.owners[0].address.suburb);
            expect(retrievalResult[0].owners[0].address.city).toEqual(sourcePatient1.owners[0].address.city);
            expect(retrievalResult[0].owners[0].address.province).toEqual(sourcePatient1.owners[0].address.province);
            expect(retrievalResult[0].owners[0].address.postalCode).toEqual(sourcePatient1.owners[0].address.postalCode);
        });
    });

    describe('retrieveAll', () => {
        it('should retrive a single Patient item if there is only one.', async () => {
            let patientProvider = new PatientProvider();

            await patientProvider.save(sourcePatient1);

            let retrievalResult = await patientProvider.retrieveAll();

            expect(retrievalResult.length).toEqual(1);
            expect(retrievalResult[0].name).toEqual(sourcePatient1.name);
            expect(retrievalResult[0].surname).toEqual(sourcePatient1.surname);
            expect(retrievalResult[0].isBloodDonor).toEqual(sourcePatient1.isBloodDonor);
            expect(retrievalResult[0].bloodType).toEqual(sourcePatient1.bloodType);
            expect(retrievalResult[0].practiceId).toEqual(sourcePatient1.practiceId);
            expect(retrievalResult[0].lastBloodDonationdate).toEqual(sourcePatient1.lastBloodDonationdate);
            expect(retrievalResult[0].owners[0].firstName).toEqual(sourcePatient1.owners[0].firstName);
            expect(retrievalResult[0].owners[0].surname).toEqual(sourcePatient1.owners[0].surname);
            expect(retrievalResult[0].owners[0].emailAddresses[0]).toEqual(sourcePatient1.owners[0].emailAddresses[0]);
            expect(retrievalResult[0].owners[0].phoneNumbers[0]).toEqual(sourcePatient1.owners[0].phoneNumbers[0]);
            expect(retrievalResult[0].owners[0].address.line1).toEqual(sourcePatient1.owners[0].address.line1);
            expect(retrievalResult[0].owners[0].address.line2).toEqual(sourcePatient1.owners[0].address.line2);
            expect(retrievalResult[0].owners[0].address.suburb).toEqual(sourcePatient1.owners[0].address.suburb);
            expect(retrievalResult[0].owners[0].address.city).toEqual(sourcePatient1.owners[0].address.city);
            expect(retrievalResult[0].owners[0].address.province).toEqual(sourcePatient1.owners[0].address.province);
            expect(retrievalResult[0].owners[0].address.postalCode).toEqual(sourcePatient1.owners[0].address.postalCode);
        });

        it('should retrive a multiple Patient items if there many.', async () => {
            let patientProvider = new PatientProvider();

            await patientProvider.save(sourcePatient1);
            await patientProvider.save(sourcePatient2);

            let retrievalResult = await patientProvider.retrieveAll();

            expect(retrievalResult.length).toEqual(2);
            expect(retrievalResult[0].name).toEqual(sourcePatient1.name);
            expect(retrievalResult[0].surname).toEqual(sourcePatient1.surname);
            expect(retrievalResult[0].isBloodDonor).toEqual(sourcePatient1.isBloodDonor);
            expect(retrievalResult[0].bloodType).toEqual(sourcePatient1.bloodType);
            expect(retrievalResult[0].practiceId).toEqual(sourcePatient1.practiceId);
            expect(retrievalResult[0].lastBloodDonationdate).toEqual(sourcePatient1.lastBloodDonationdate);
            expect(retrievalResult[0].owners[0].firstName).toEqual(sourcePatient1.owners[0].firstName);
            expect(retrievalResult[0].owners[0].surname).toEqual(sourcePatient1.owners[0].surname);
            expect(retrievalResult[0].owners[0].emailAddresses[0]).toEqual(sourcePatient1.owners[0].emailAddresses[0]);
            expect(retrievalResult[0].owners[0].phoneNumbers[0]).toEqual(sourcePatient1.owners[0].phoneNumbers[0]);
            expect(retrievalResult[0].owners[0].address.line1).toEqual(sourcePatient1.owners[0].address.line1);
            expect(retrievalResult[0].owners[0].address.line2).toEqual(sourcePatient1.owners[0].address.line2);
            expect(retrievalResult[0].owners[0].address.suburb).toEqual(sourcePatient1.owners[0].address.suburb);
            expect(retrievalResult[0].owners[0].address.city).toEqual(sourcePatient1.owners[0].address.city);
            expect(retrievalResult[0].owners[0].address.province).toEqual(sourcePatient1.owners[0].address.province);
            expect(retrievalResult[0].owners[0].address.postalCode).toEqual(sourcePatient1.owners[0].address.postalCode);

            expect(retrievalResult[1].name).toEqual(sourcePatient2.name);
            expect(retrievalResult[1].surname).toEqual(sourcePatient2.surname);
            expect(retrievalResult[1].isBloodDonor).toEqual(sourcePatient2.isBloodDonor);
            expect(retrievalResult[1].bloodType).toEqual(sourcePatient2.bloodType);
            expect(retrievalResult[1].practiceId).toEqual(sourcePatient2.practiceId);
            expect(retrievalResult[1].lastBloodDonationdate).toEqual(sourcePatient2.lastBloodDonationdate);
            expect(retrievalResult[1].owners[0].firstName).toEqual(sourcePatient2.owners[0].firstName);
            expect(retrievalResult[1].owners[0].surname).toEqual(sourcePatient2.owners[0].surname);
            expect(retrievalResult[1].owners[0].emailAddresses[0]).toEqual(sourcePatient2.owners[0].emailAddresses[0]);
            expect(retrievalResult[1].owners[0].phoneNumbers[0]).toEqual(sourcePatient2.owners[0].phoneNumbers[0]);
            expect(retrievalResult[1].owners[0].address.line1).toEqual(sourcePatient2.owners[0].address.line1);
            expect(retrievalResult[1].owners[0].address.line2).toEqual(sourcePatient2.owners[0].address.line2);
            expect(retrievalResult[1].owners[0].address.suburb).toEqual(sourcePatient2.owners[0].address.suburb);
            expect(retrievalResult[1].owners[0].address.city).toEqual(sourcePatient2.owners[0].address.city);
            expect(retrievalResult[1].owners[0].address.province).toEqual(sourcePatient2.owners[0].address.province);
            expect(retrievalResult[1].owners[0].address.postalCode).toEqual(sourcePatient2.owners[0].address.postalCode);
        });

        it('should retrive all email addresses and phone numbers for the Patient.', async () => {
            let patientProvider = new PatientProvider();

            await patientProvider.save(sourcePatient3);

            let retrievalResult = await patientProvider.retrieveAll();

            expect(retrievalResult[0].owners[0].emailAddresses[0]).toEqual(sourcePatient3.owners[0].emailAddresses[0]);
            expect(retrievalResult[0].owners[0].phoneNumbers[0]).toEqual(sourcePatient3.owners[0].phoneNumbers[0]);
            expect(retrievalResult[0].owners[0].emailAddresses[1]).toEqual(sourcePatient3.owners[0].emailAddresses[1]);
            expect(retrievalResult[0].owners[0].phoneNumbers[1]).toEqual(sourcePatient3.owners[0].phoneNumbers[1]);
        });

        it('should return an empty array if there are none', async () => {
            let patientProvider = new PatientProvider();

            let retrievalResult = await patientProvider.retrieveAll();

            expect(retrievalResult).toBeDefined();
            expect(retrievalResult.length).toEqual(0);
        });
    });

    describe('findById', ()=>{
        it('should return the Patient matching a specific id', async ()=>{
            let patientProvider = new PatientProvider();

            const save1 = await patientProvider.save(sourcePatient1);
            const save2 = await patientProvider.save(sourcePatient2);
            const save3 = await patientProvider.save(sourcePatient3);

            // query out of order 
            let retrievalResult2 = await patientProvider.findById(save2.id);
            let retrievalResult1 = await patientProvider.findById(save1.id);
            let retrievalResult3 = await patientProvider.findById(save3.id);

            expect(retrievalResult1.name).toEqual(sourcePatient1.name);
            expect(retrievalResult1.surname).toEqual(sourcePatient1.surname);
            expect(retrievalResult1.isBloodDonor).toEqual(sourcePatient1.isBloodDonor);
            expect(retrievalResult1.bloodType).toEqual(sourcePatient1.bloodType);
            expect(retrievalResult1.practiceId).toEqual(sourcePatient1.practiceId);
            expect(retrievalResult1.lastBloodDonationdate).toEqual(sourcePatient1.lastBloodDonationdate);
            expect(retrievalResult1.owners[0].firstName).toEqual(sourcePatient1.owners[0].firstName);
            expect(retrievalResult1.owners[0].surname).toEqual(sourcePatient1.owners[0].surname);
            expect(retrievalResult1.owners[0].emailAddresses[0]).toEqual(sourcePatient1.owners[0].emailAddresses[0]);
            expect(retrievalResult1.owners[0].phoneNumbers[0]).toEqual(sourcePatient1.owners[0].phoneNumbers[0]);
            expect(retrievalResult1.owners[0].address.line1).toEqual(sourcePatient1.owners[0].address.line1);
            expect(retrievalResult1.owners[0].address.line2).toEqual(sourcePatient1.owners[0].address.line2);
            expect(retrievalResult1.owners[0].address.suburb).toEqual(sourcePatient1.owners[0].address.suburb);
            expect(retrievalResult1.owners[0].address.city).toEqual(sourcePatient1.owners[0].address.city);
            expect(retrievalResult1.owners[0].address.province).toEqual(sourcePatient1.owners[0].address.province);
            expect(retrievalResult1.owners[0].address.postalCode).toEqual(sourcePatient1.owners[0].address.postalCode);

            expect(retrievalResult2.name).toEqual(sourcePatient2.name);
            expect(retrievalResult2.surname).toEqual(sourcePatient2.surname);
            expect(retrievalResult2.isBloodDonor).toEqual(sourcePatient2.isBloodDonor);
            expect(retrievalResult2.bloodType).toEqual(sourcePatient2.bloodType);
            expect(retrievalResult2.practiceId).toEqual(sourcePatient2.practiceId);
            expect(retrievalResult2.lastBloodDonationdate).toEqual(sourcePatient2.lastBloodDonationdate);
            expect(retrievalResult2.owners[0].firstName).toEqual(sourcePatient2.owners[0].firstName);
            expect(retrievalResult2.owners[0].surname).toEqual(sourcePatient2.owners[0].surname);
            expect(retrievalResult2.owners[0].emailAddresses[0]).toEqual(sourcePatient2.owners[0].emailAddresses[0]);
            expect(retrievalResult2.owners[0].phoneNumbers[0]).toEqual(sourcePatient2.owners[0].phoneNumbers[0]);
            expect(retrievalResult2.owners[0].address.line1).toEqual(sourcePatient2.owners[0].address.line1);
            expect(retrievalResult2.owners[0].address.line2).toEqual(sourcePatient2.owners[0].address.line2);
            expect(retrievalResult2.owners[0].address.suburb).toEqual(sourcePatient2.owners[0].address.suburb);
            expect(retrievalResult2.owners[0].address.city).toEqual(sourcePatient2.owners[0].address.city);
            expect(retrievalResult2.owners[0].address.province).toEqual(sourcePatient2.owners[0].address.province);
            expect(retrievalResult2.owners[0].address.postalCode).toEqual(sourcePatient2.owners[0].address.postalCode);

            expect(retrievalResult3.name).toEqual(sourcePatient3.name);
            expect(retrievalResult3.surname).toEqual(sourcePatient3.surname);
            expect(retrievalResult3.isBloodDonor).toEqual(sourcePatient3.isBloodDonor);
            expect(retrievalResult3.bloodType).toEqual(sourcePatient3.bloodType);
            expect(retrievalResult3.practiceId).toEqual(sourcePatient3.practiceId);
            expect(retrievalResult3.lastBloodDonationdate).toEqual(sourcePatient3.lastBloodDonationdate);
            expect(retrievalResult3.owners[0].firstName).toEqual(sourcePatient3.owners[0].firstName);
            expect(retrievalResult3.owners[0].surname).toEqual(sourcePatient3.owners[0].surname);
            expect(retrievalResult3.owners[0].emailAddresses[0]).toEqual(sourcePatient3.owners[0].emailAddresses[0]);
            expect(retrievalResult3.owners[0].phoneNumbers[0]).toEqual(sourcePatient3.owners[0].phoneNumbers[0]);
            expect(retrievalResult3.owners[0].address.line1).toEqual(sourcePatient3.owners[0].address.line1);
            expect(retrievalResult3.owners[0].address.line2).toEqual(sourcePatient3.owners[0].address.line2);
            expect(retrievalResult3.owners[0].address.suburb).toEqual(sourcePatient3.owners[0].address.suburb);
            expect(retrievalResult3.owners[0].address.city).toEqual(sourcePatient3.owners[0].address.city);
            expect(retrievalResult3.owners[0].address.province).toEqual(sourcePatient3.owners[0].address.province);
            expect(retrievalResult3.owners[0].address.postalCode).toEqual(sourcePatient3.owners[0].address.postalCode);
        });

        it('should return null if the Id does not exist', async ()=>{
            let patientProvider = new PatientProvider();
            let retrievalResult1 = await patientProvider.findById('5ee62f0935caf454f0d521e6');
            expect(retrievalResult1).toBe(null);
        });

    });
});