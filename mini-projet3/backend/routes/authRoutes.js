const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Installe bcryptjs si pas encore fait : npm install bcryptjs
const User = mongoose.model('User');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:5173/');
        }
    );

    app.post('/auth/register', (req, res, next) => {
        passport.authenticate('local-register', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(400).json({ message: info.message || 'Échec de l’enregistrement' });
            }

            req.login(user, (err) => {
                if (err) return next(err);
            
                req.session.save((err) => {
                    if (err) return next(err);
                    console.log("User logged in + session saved:", user);
                    return res.status(200).json({
                        message: 'Login success', user: {
                            id: user._id,
                            username: user.displayName,
                            profilePicture: user.profilePicture
                        }
                    });
                });
            });            
        })(req, res, next);
    });

    app.post('/auth/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ message: info.message || 'Identifiants invalides' });
            }

            req.login(user, (err) => {
                if (err) return next(err);
            
                req.session.save((err) => {
                    if (err) return next(err);
                    console.log("User logged in + session saved:", user);
                    return res.status(200).json({
                        message: 'Login success', user: {
                            id: user._id,
                            username: user.displayName,
                            profilePicture: user.profilePicture
                        }
                    });
                });
            });            
        })(req, res, next);
    });

    app.get(
        '/auth/github',
        passport.authenticate('github')
    );

    app.get(
        '/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: 'http://localhost:5173/'
        }),
        (req, res) => {
            res.redirect('http://localhost:5173/');
        }
    );

    app.get('/auth/logout', (req, res) => {
        req.logout();
        res.redirect('http://localhost:5173/');
    });
};