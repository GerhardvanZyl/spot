const PatientModel = require('../model/patient');
const { query } = require('express');

class PatientProvider {
    retrieveAll() {
        return new Promise((resolve, reject) => {
            let query = PatientModel.find({});

            query.exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const returnValue = [];

                    for (let res of result) {
                        returnValue.push({
                            id: res._id.toString(),
                            name: res.name,
                            surname: res.surname,
                            owners: res.owners,
                            isBloodDonor: res.isBloodDonor,
                            bloodType: res.bloodType,
                            practiceId: res.practiceId,
                            lastBloodDonationDate: res.lastBloodDonationDate,
                            //comments: res.comments?.map(comment => { return {...comment};})
                        });
                    }

                    resolve(returnValue);
                }
            })
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            let query = PatientModel.findById(id);

            query.exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result) {
                        resolve({
                            id: result._id.toString(),
                            name: result.name,
                            surname: result.surname,
                            owners: result.owners,
                            isBloodDonor: result.isBloodDonor,
                            bloodType: result.bloodType,
                            practiceId: result.practiceId,
                            lastBloodDonationDate: result.lastBloodDonationDate,
                            //comments: result.comments?.map(comment => { return {...comment};})
                        });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    async findByProperty(key, value) {

        // TODO case insensitivity
        return new Promise((resolve, reject) => {
            try {
                let queryObj = {};
                queryObj[key] = value;

                let query = PatientModel.find(queryObj);

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
                                    surname: res.surname,
                                    owners: res.owners,
                                    isBloodDonor: res.isBloodDonor,
                                    bloodType: res.bloodType,
                                    practiceId: res.practiceId,
                                    lastBloodDonationDate: res.lastBloodDonationDate,
                                    //comments: res.comments?.map(comment => { return {...comment};})
                                });
                            }

                            resolve(returnValue);
                        }
                    }
                });
            } catch (e) {
                console.error(e);
            }
        })
    }

    async save(patient) {

        if (patient?.id) {
            return new Promise((resolve, reject) => {
                let query = PatientModel.findById(patient.id);

                query.exec((err, queryResult) => {
                    queryResult.name = patient.name;
                    queryResult.surname = patient.surname;
                    queryResult.owners = patient.owners;
                    queryResult.isBloodDonor = patient.isBloodDonor;
                    queryResult.bloodType = patient.bloodType;
                    queryResult.practiceId = patient.practiceId;
                    queryResult.emailAddresses = patient.emailAddresses;
                    queryResult.phoneNumbers = patient.phoneNumbers;
                    queryResult.lastBloodDonationDate = patient.lastBloodDonationDate;
                    //queryResult.comments = patient.comments && patient.comments.length > 0 ? patient.comments : [];

                    queryResult.save((err, result) => {

                        if (err) {
                            reject(err);
                            return;
                        }
    
                        resolve({
                            id: result._id.toString(),
                            name: result.name,
                            surname: result.surname,
                            owners: result.owners,
                            isBloodDonor: result.isBloodDonor,
                            bloodType: result.bloodType,
                            practiceId: result.practiceId,
                            lastBloodDonationDate: result.lastBloodDonationDate
                        });

                    });

                });
            });

        } else {

            const patientModel = new PatientModel({
                // TODO; clone owners as well
                id: patient?.id?.toString(),
                name: patient.name,
                surname: patient.surname,
                owners: patient.owners,
                isBloodDonor: patient.isBloodDonor,
                bloodType: patient.bloodType,
                practiceId: patient.practiceId,
                lastBloodDonationDate: patient.lastBloodDonationDate
            });

            return new Promise((resolve, reject) => {
                patientModel.save((err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve({
                        id: result._id.toString(),
                        name: result.name,
                        surname: result.surname,
                        owners: result.owners,
                        isBloodDonor: result.isBloodDonor,
                        bloodType: result.bloodType,
                        practiceId: result.practiceId,
                        lastBloodDonationDate: result.lastBloodDonationDate
                    });
                });
            });
        }
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            PatientModel.deleteOne({ _id: id }, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    }
};

module.exports = PatientProvider;