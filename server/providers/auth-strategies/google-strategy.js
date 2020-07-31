const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config-provider');

function extractProfile(profile){
    let imageUrl = '';

    if(profile.photos && profile.photos.length){
        imageUrl = profile.photos[0].value;
    }

    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl
    };
}

passport.use(new GoogleStrategy({
    clientID: config.googleAuthConfig.clientId,
    clientSecret: config.googleAuthConfig.clientSecret,
    callbackURL: config.googleAuthConfig.redirect,
    accessType: 'offline',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
(accessToken, refreshToken, profile, done) => {
    done(null, extractProfile(profile));
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user)
});

exports 
