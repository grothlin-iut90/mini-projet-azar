const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bCrypt = require('bcrypt');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: 'http://localhost:5000/auth/google/callback',
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);  // L'utilisateur existe déjà
                }

                // Création d'un nouvel utilisateur avec la photo de profil
                const user = await new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    displayName: profile.displayName,
                    profilePicture: profile.photos[0].value  // Récupérer la photo de profil
                }).save();

                done(null, user);  // Retourner l'utilisateur créé
            } catch (err) {
                done(err, null);  // Gérer les erreurs
            }
        }
    )
);

passport.use('local-register', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // <-- AJOUTER ÇA !!
    },
    function (req, email, password, done) {
        let generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
        }
        User.findOne({
            email: email
        }).then(function (user) {
            if (user) {
                return done(null, false, {
                    message: 'That email is already taken'
                });
            } else {
                let userPassword = generateHash(password);
                let data = {
                    email: email,
                    password: userPassword,
                    displayName: req.body.username
                };
                User.create(data).then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    })
);
passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        let isValidPassword = function (userpass, password) {
            return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ email: email })
            .then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                console.log('User found:', user);
                return done(null, user);
            })
            .catch(function (err) {
                console.log('Error:', err);
                return done(err);
            });
    }
));

passport.use(
    new GitHubStrategy(
        {
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: 'http://localhost:5000/auth/github/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ githubId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);  // L'utilisateur existe déjà
                }

                // Création d'un nouvel utilisateur GitHub
                const user = await new User({
                    githubId: profile.id,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                    displayName: profile.displayName || profile.username,
                    profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null
                }).save();

                done(null, user);  // Retourner l'utilisateur créé
            } catch (err) {
                done(err, null);  // Gérer les erreurs
            }
        }
    )
);