const express = require('express');
const createClientGoogleUrl = require('../providers/google-auth-provider.js');

const router = express.Router();

router.get('/api/configuration', (req, res)=>{
    let googleAuthUrl = createClientGoogleUrl();
    res.json({
        authUrl: googleAuthUrl
    });
});