const PracticeModel = require('../model/practice');
const { resolve } = require('path');

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
                            emailAddresses: res.emailAddresses,
                            phoneNumbers: res.phoneNumbers,
                            address: res.address ? {
                                line1: res.address?.line1,
                                line2: res.address?.line2,
                                suburb: res.address?.suburb,
                                city: res.address?.city,
                                province: res.address?.province,
                                postalCode: res.address?.postalCode
                            } 
                            : null,
                            patients: res.patients
                        })
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
                            emailAddresses: res.emailAddresses,
                            phoneNumbers: res.phoneNumbers,
                            address: res.address ? {
                                line1: res.address?.line1,
                                line2: res.address?.line2,
                                suburb: res.address?.suburb,
                                city: res.address?.city,
                                province: res.address?.province,
                                postalCode: res.address?.postalCode
                            } : null ,
                            patients: res.patients
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

            query.exec((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (!res) {
                        resolve(null);
                    } else {
                        const returnValue = [];

                        for (let res of result) {
                            returnValue.push({
                                id: res._id.toString(),
                                name: res.name,
                                emailAddresses: res.emailAddresses,
                                phoneNumbers: res.phoneNumbers,
                                address: res.address ? {
                                    line1: res.address?.line1,
                                    line2: res.address?.line2,
                                    suburb: res.address?.suburb,
                                    city: res.address?.city,
                                    province: res.address?.province,
                                    postalCode: res.address?.postalCode
                                } : null,
                                patients: res.patients
                            })
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

                            // TODO: clone email and phone and address
                            existing.name = practice.name;
                            existing.emailAddresses = practice.emailAddresses;
                            existing.phoneNumbers = practice.phoneNumbers;
                            existing.address = practice.address;

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

                // TODO: clone emailAddresses and phone numbers as well
                let practiceModel = PracticeModel({
                    name: practice.name,
                    emailAddresses: practice.emailAddresses,
                    phoneNumbers: practice.phoneNumbers,
                    address: practice.address ? {
                        line1: practice.address.line1,
                        line2: practice.address.line2,
                        suburb: practice.address.suburb,
                        city: practice.address.city,
                        province: practice.address.province,
                        postalCode: practice.address.postalCode
                    } : null
                });

                practiceModel.save((err, result) => {
                    if (err) {
                        reject(err);
                    }

                    // TODO: clone emailAddresses and phone numbers as well
                    resolve({
                        id: result._id,
                        name: result.name,
                        emailAddresses: result.emailAddresses,
                        phoneNumbers: result.phoneNumbers,
                        address: result.address ? {
                            line1: result.address.line1,
                            line2: result.address.line2,
                            suburb: result.address.suburb,
                            city: result.address.city,
                            province: result.address.province,
                            postalCode: result.address.postalCode
                        } : null,
                        patients: result.patients
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
};

module.exports = PracticeProvider;