const express = require('express');
const PatientProvider = require('../providers/patient-provider');
const authProvivder = require('../providers/auth-povider.js');

const router = express.Router();

router.get('/', authProvivder.authenticationCheck, async (req, res) => {
    const patientProvider = new PatientProvider();
    try {
        let patients = await patientProvider.retrieveAll();
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.get('/id/:id', authProvivder.authenticationCheck, async (req, res) => {
    const patientProvider = new PatientProvider();
    try {
        let patients = await patientProvider.findById(req.params['id']);

        if(!patients) res.status(404).json({});
        else res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.get('/:key/:value',  authProvivder.authenticationCheck, async (req, res) => {
    const patientProvider = new PatientProvider();
    try {
        let patients = await patientProvider.findByProperty(req.params['key'], req.params['value']);

        if(!patients) res.status(404).json({});
        else res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.post('/', authProvivder.authenticationCheck, async (req, res) => {
    const patientProvider = new PatientProvider();
    try {
        let result = await patientProvider.save({
            id: req.body.id,
            name: req.body.name,
            surname: req.body.surname,
            owners: req.body.owners.map(owner => { return {...owner};}),
            isBloodDonor: req.body.isBloodDonor,
            bloodType: req.body.bloodType,
            practiceId: req.body.practiceId,
            lastBloodDonationDate: req.body.lastBloodDonationDate,
            comments: req.body.comments.map(comment => {return {...comment};})
        });

        res.status(200).json(result);

    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.delete('/id/:id', authProvivder.authenticationCheck, async (req, res) => {
    const patientProvider = new PatientProvider();
    try {
        let result = await patientProvider.delete(req.params['id']);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

module.exports = router;