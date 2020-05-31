const express = require('express');
const PracticeProvider = require('../providers/practiceProvider.js');
const PracticeModel = require('../model/practice.js');

const router = express.Router();
const practiceProvider = new PracticeProvider();

router.get('/practice', async (req, res, next) => {
    let practices = await practiceProvider.retrieveAll();

    res.json(practices);
});

router.post('/practice', (req, res) => {

    try {
        let result = practiceProvider.save({
            practiceName: req.body.practiceName,
            emailAddresses: req.body.emailAddresses,
            phoneNumbers: req.body.phoneNumbers,
            address: req.body.address,
            patients: req.body.patients
        });

        res.status(200).json(result);

    } catch (err){
        return res.status(400).json(err);
    }
})

module.exports = router;