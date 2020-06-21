const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const authProvider = require('../providers/auth-povider');

const router = express.Router();

router.post('/', authProvider.authenticate, (req, res) => {
    res.status(200).json({'statusCode': 200, 'message': 'hello auth'});
});

module.exports = router;