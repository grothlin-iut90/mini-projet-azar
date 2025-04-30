const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const User = require('../models/User');

const router = express.Router();

// Middleware pour vérifier l'authentification
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Non authentifié' });
}

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.json({ message: 'Bienvenue sur votre profil', user: { id: req.user.id, email: req.user.email } });
});

// Inscription
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'Utilisateur créé', user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// Connexion
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Connexion réussie', user: { id: req.user.id, email: req.user.email } });
});

// Déconnexion
router.post('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ message: 'Déconnexion réussie' });
        });
    });
});

module.exports = router;