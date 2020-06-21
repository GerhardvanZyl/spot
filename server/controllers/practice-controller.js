const express = require('express');
const PracticeProvider = require('../providers/practice-provider.js');
const PracticeModel = require('../model/practice.js');
const authProvivder = require('../providers/auth-povider.js');

const router = express.Router();

router.get('/', authProvivder.authenticationCheck, async (req, res, next) => {
   
    const practiceProvider = new PracticeProvider();
    try {
        let practices = await practiceProvider.retrieveAll();
        res.status(200).json(practices);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.get('/id/:id', authProvivder.authenticationCheck, async (req, res, next) => {
   
    const practiceProvider = new PracticeProvider();
    try {
        console.log(req.params["id"]);
        let practices = await practiceProvider.findById(req.params["id"]);

        if(!practices) res.status(404).json({});
        else res.status(200).json(practices);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.post('/', authProvivder.authenticationCheck, async (req, res) => {

    const practiceProvider = new PracticeProvider();
    try {
        let result = await practiceProvider.save({
            name: req.body.name,
            emailAddresses: req.body.emailAddresses,
            phoneNumbers: req.body.phoneNumbers,
            address: req.body.address,
            patients: req.body.patients
        });

        res.status(200).json(result);

    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
})

module.exports = router;