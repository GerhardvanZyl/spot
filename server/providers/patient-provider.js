const PatientModel = require('../model/patient');

class PatientProvider {
    retrieveAll(){
        return new Promise((resolve, reject) => {
            let query = PatientModel.find({});

            query.exec((err, result) => {
                if(err) {
                    reject(err);
                } else {
                    const returnValue = [];

                    for(let res of result) {
                        returnValue.push({
                            name: result.name,
                            surname: result.surname,
                            owners: result.owners,
                            isBloodDonor: result.isBloodDonor,
                            bloodType: result.bloodType,
                            practiceId: result.practiceId
                        });
                    }
                }
            })
        });
    }

    findById(id){
        return new Promise((resolve, reject) => {
            let query = PatientModel.findById({id});

            query.exec((err, result) => {
                if(err) {
                    reject(err);
                } else {
                    const returnValue = [];

                    for(let res of result) {
                        returnValue.push({
                            name: result.name,
                            surname: result.surname,
                            owners: result.owners,
                            isBloodDonor: result.isBloodDonor,
                            bloodType: result.bloodType,
                            practiceId: result.practiceId
                        });
                    }
                }
            })
        })
    }

    save(patient){
        const patientModel = new PatientModel({
            // TODO; clone owners as well
            name: patient.name,
            surname: patient.surname,
            owners: patient.owners,
            isBloodDonor: patient.isBloodDonor,
            bloodType: patient.bloodType,
            practiceId: patient.practiceId
        });

        return new Promise((resolve, reject) => {
            patientModel.save((err, result) => {
                if(err){
                    reject(err);
                }

                console.log("patient added: ");
                console.log(result);

                resolve({
                    name: result.name,
                    surname: result.surname,
                    owners: result.owners,
                    isBloodDonor: result.isBloodDonor,
                    bloodType: result.bloodType,
                    practiceId: result.practiceId
                });
            });
        });
    }

    delete(id){
        return new Promise((resolve, reject) => {
            PatientModel.deleteOne({_id: id}, (err, result) => {
                if(err){
                    reject(err);
                }

                console.log('delete patient result in provider: ');
                console.log(result);

                resolve(result);
            });
        });
    }
};

module.exports = PatientProvider;