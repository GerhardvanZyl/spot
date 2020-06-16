const express = require('express');
const PracticeProvider = require('../providers/practice-provider.js');
const PracticeModel = require('../model/practice.js');

const router = express.Router();

router.get('/api/practice', async (req, res, next) => {
   
    const practiceProvider = new PracticeProvider();
    try {
        let practices = await practiceProvider.retrieveAll();
        res.status(200).json(practices);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.get('/api/practice/id/:id', async (req, res, next) => {
   
    const practiceProvider = new PracticeProvider();
    try {
        console.log(req.params["id"]);
        let practices = await practiceProvider.retrieveById(req.params["id"]);
        res.status(200).json(practices);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

router.post('/api/practice', async (req, res) => {

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