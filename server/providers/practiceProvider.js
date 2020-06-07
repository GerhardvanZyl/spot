const PracticeModel = require('../model/practice.js');

class PracticeProvider {
    /**
     * Retrieves all the practices and their details
     */
    retrieveAll() {
        return new Promise((resolve, reject) => {
            let query = PracticeModel.find({});

            query.exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const returnValue = [];

                    for (let res of result) {
                        returnValue.push({
                            practiceName: res.practiceName,
                            emailAddresses: res.emailAddresses,
                            phoneNumbers: res.phoneNumbers,
                            address: res.address,
                            patients: res.patients
                        })
                    }

                    resolve(returnValue);
                }
            });
        });
    }

    /**
     * Saves a practice model the datastore
     * @param {*} practice 
     */
    save(practice) {
        let practiceModel = PracticeModel({
            practiceName: practice.practiceName,
            emailAddresses: practice.emailAddresses,
            phoneNumbers: practice.phoneNumbers,
            address: practice.address,
            patients: practice.patients
        });

        return new Promise((resolve, reject) => {

            practiceModel.save((err, result) => {
                if (err) {
                    reject(err);
                }

                resolve({
                    practiceName: result.practiceName,
                    emailAddresses: result.emailAddresses,
                    phoneNumbers: result.phoneNumbers,
                    address: result.address,
                    patients: result.patients
                });
            });
        });
    }
};

module.exports = PracticeProvider;