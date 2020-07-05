const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const authProvider = require('../providers/auth-povider');
const { SSL_OP_NETSCAPE_CA_DN_BUG } = require('constants');

const router = express.Router();

// router.post('/', authProvider.authenticate, (req, res) => {
//     res.status(200).json({'statusCode': 200, 'message': 'hello auth'});
// });

router.get('/login', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/verify', passport.authenticate('google'), (req, res, next)=>{
    console.log("redirect url hit");
    res.redirect("http://vaaccs.com/practices");
});

module.exports = router;