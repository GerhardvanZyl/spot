const PracticeModel = require('../model/practice');

class PracticeProvider {
    /**
     * Retrieves all the practices and their details
     */
    retrieveAll() {
        return new Promise((resolve, reject) => {
            let query = PracticeModel.find({});

            query.exec((err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    const returnValue = [];

                    for (let res of result) {
                        returnValue.push({
                            id: res._id.toString(),
                            name: res.name,
                            emailAddresses: [...res.emailAddresses],
                            phoneNumbers: [...res.phoneNumbers],
                            address: {...res.address },
                            patients: res.patients?.map(patient => {return {...patient};})
                        });
                    }

                    resolve(returnValue);
                }
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            let query = PracticeModel.findById(id);

            query.exec((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (!res) {
                        resolve(null);
                    } else {
                        const returnObj = {
                            id: res._id.toString(),
                            name: res.name,
                            emailAddresses: [...res.emailAddresses],
                            phoneNumbers: [...res.phoneNumbers],
                            address: {...res.address },
                            patients: res.patients?.map(patient => {return {...patient};})
                        };

                        resolve(returnObj);
                    }
                }
            });
        });
    }

    findByProperty(key, value) {
        return new Promise((resolve, reject) => {
            let query = PracticeModel.findByProperty(key, value);

            query.exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (!result) {
                        resolve(null);
                    } else {
                        const returnValue = [];

                        for (let res of result) {
                            returnValue.push({
                                id: res._id.toString(),
                                name: res.name,
                                emailAddresses: [...res.emailAddresses],
                                phoneNumbers: [...res.phoneNumbers],
                                address: {...res.address },
                                patients: res.patients?.map(patient => {return {...patient};})
                            });
                        }

                        resolve(returnValue);
                    }
                }
            });
        });
    }

    /**
     * Saves a practice model the datastore
     * @param {*} practice 
     */
    save(practice) {

        return new Promise((resolve, reject) => {

            if (practice.id) {
                let query = PracticeModel.findById(practice.id);

                query.exec((err, existing) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (!existing) {
                            resolve(null);
                        } else {

                            existing.name = practice.name;
                            existing.emailAddresses = [...practice.emailAddresses];
                            existing.phoneNumbers = [...practice.phoneNumbers];
                            existing.address = {...practice.address};

                            existing.save((err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            });
                        }
                    }
                });
            } else {

                let practiceModel = PracticeModel({
                    name: practice.name,
                    emailAddresses: [...practice.emailAddresses],
                    phoneNumbers: [...practice.phoneNumbers],
                    address: {...practice.address }
                });

                practiceModel.save((err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve({
                        id: result._id,
                        name: result.name,
                        emailAddresses: [...result.emailAddresses],
                        phoneNumbers: [...result.phoneNumbers],
                        address: {...result.address },
                        patients: result.patients?.map(patient => {return {...patient};})
                    });

                });
            }
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            PracticeModel.deleteOne({ _id: id }, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    }
}

module.exports = PracticeProvider;