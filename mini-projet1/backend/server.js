const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors'); 
const passport = require('./config/passport');
const userRoutes = require('./routes/user.router');
const User = require('./models/User');
const sequelize = require('./config/db');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // autorise les cookies/session
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/auth', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

sequelize.sync().then(() => {
    console.log('Base de données synchronisée');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});