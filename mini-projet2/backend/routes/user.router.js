const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Inscription
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash });
        res.status(201).json({ message: 'Utilisateur créé', user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de l’inscription', error: err.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// Middleware de vérification du token
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token invalide' });
    }
}

// Route protégée
router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'email'] });
    res.json({ user });
});

module.exports = router;