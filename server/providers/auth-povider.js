const passport = require('passport');
const googleStrategy = require('./auth-strategies/google-strategy');
const config = require('./config-provider');

module.exports = authProvider = {
    serializer: (user, done) => {
        if (user) {
            done(null, user);
        }
    },
    deserializer: (id, done) => {
        done(null, id);
    },
    authenticate: (req, res, next) => {
        if(config.authMode === "dev") {
            req.login(user, (error) => {
                if (error) {
                    return next(error);
                }

                next();
            });
        }

        passport.authenticate('google', (error, user, info) => {
            if (error) {
                res.status(401).json({ statusCode: 401, message: 'User not authenticated' });
            }

            req.login(user, (error) => {
                if (error) {
                    return next(error);
                }

                next();
            });
        })(req, res, next);
    },
    authenticationCheck: (req, res, next) => {

        if(config.authMode === "dev") {
            return next();
        }
        
        // For now only dev test account
        // TODO: move to env var
        if(req?.user?.id === "106479279514574710141"){
            return next();
        }
        res.status(401).json({message: "Unauthorized"});
    },
    getSessionInfo: (req, res) => {
        return req.user;
    }
}

passport.serializeUser(authProvider.serializer);
passport.deserializeUser(authProvider.deserializer);