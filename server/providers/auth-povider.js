const localStrategy = require('./auth-strategies/local-strategy.js');
const passport = require('passport');

console.log('auth provider');

module.exports = authProvider = {
    strategy: localStrategy,
    serializer: (user, done) => {
        if (user) {
            done(null, user);
        }
    },
    deserializer: (id, done) => {
        done(null, id);
    },
    authenticate: (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if (error) {
                res.status(400).json({ statusCode: 400, message: 'User not authenticated' });
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
        if(req.user){
            return next();
        }
        res.status(401).json({message: "Unauthorized"});
    }
}

passport.use(authProvider.strategy);
passport.serializeUser(authProvider.serializer);
passport.deserializeUser(authProvider.deserializer);