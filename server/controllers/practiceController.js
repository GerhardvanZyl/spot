const express = require('express');
const PracticeProvider = require('../providers/practiceProvider.js');
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

router.post('/practice', async (req, res) => {

    const practiceProvider = new PracticeProvider();
    try {
        let result = await practiceProvider.save({
            practiceName: req.body.practiceName,
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