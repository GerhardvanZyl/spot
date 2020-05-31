const mongoose = require('mongoose');
const PracticeProvider = require('../../providers/practiceProvider');

describe('PracticeProvider', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true
        }, err => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    describe('save', () => {
        it('should save the practice item', async () => {
            debugger;
            let practiceProvider = new PracticeProvider();
            let sourcePractice = {
                practiceName: 'oli',
                emailAddresses: [{ value: 'a@b.com' }],
                phoneNumbers: [{ value: '011565854' }],
                address: {value:'43 pecan heights, 39 cockspur rd, weltevredenpark, 1085'}
            };

            let saveResult = await practiceProvider.save(sourcePractice);

            let retrievalResult = await practiceProvider.retrieveAll();

            expect(retrievalResult.practiceName).toEqual(sourcePractice.practiceName);
            expect(retrievalResult.emailAddresses[0].value).toEqual(sourcePractice.emailAddresses[0].value);
            expect(retrievalResult.phoneNumbers[0].value).toEqual(sourcePractice.phoneNumbers[0].value);
            expect(retrievalResult.address.value).toEqual(sourcePractice.address.value);
        });
    });

});