const PracticeModel = require('../model/practice.js');

class PracticeProvider {
    retrieveAll() {
        return new Promise((resolve, reject) => {
            let query = PracticeModel.find({});

            query.exec((err, result)=>{
                if(err){
                    reject(err);
                } else {
                    console.log(result);
                    resolve({
                        practiceName: result[0].practiceName,
                        emailAddresses: result[0].emailAddresses,
                        phoneNumbers: result[0].phoneNumbers,
                        address: result[0].address,
                        patients: result[0].patients
                    });
                }
            });
        });
    }

    find(){

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
                console.log(result);
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