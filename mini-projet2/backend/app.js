const express = require('express');
const cors = require('cors'); 
const sequelize = require('./models/sequelize');
const authRoutes = require('./routes/user.router');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
});