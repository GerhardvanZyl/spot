const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = new LocalStrategy(
        (username, password, done)=>{
            if(username === 'admin' && password === 'admin'){
                return done(null, username);
            } else {
                return done('unauthed', false);
            }
        }
    )
