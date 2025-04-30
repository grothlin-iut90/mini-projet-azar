// Importation des modules nécessaires
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('./models/Message');
require('./models/User');
require('./services/passport');

const keys = require('./config/keys');
const Message = mongoose.model('Message');

const app = express();

// Middleware généraux
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configuration de la session avec un store MongoDB
const MongoStore = require('connect-mongo');
const sessionMiddleware = session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: keys.mongoURI,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
        httpOnly: true,
        sameSite: 'lax', // 'none' si HTTPS et cross-site
        secure: false   // true si HTTPS
    }
});

// Utilisation du middleware de session et Passport
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Connexion à MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Importation et utilisation des routes
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);
require('./routes/authRoutes')(app);
app.get('/', (req, res) => res.send('Server is running'));

// Configuration de Socket.io
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

const User = mongoose.model('User');

// Middleware unique pour partager la session et Passport avec Socket.io
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, (err) => {
        if (err) return next(err);
        passport.initialize()(socket.request, {}, (err) => {
            if (err) return next(err);
            passport.session()(socket.request, {}, (err) => {
                if (err) return next(err);
                console.log('✅ [Socket.io] session:', socket.request.session);
                console.log('✅ [Socket.io] user:', socket.request.user);
                next();
            });
        });
    });
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté à Socket.io');
    console.log('Utilisateur connecte :', socket.request.user);

    socket.on('sendMessage', async (messageContent) => {
        if (socket.request.user) {
            try {
                const user = socket.request.user;
                console.log('Utilisateur :', user);
                const message = new Message({
                    content: messageContent.content,
                    sender: messageContent.sender._id,
                    senderName: messageContent.sender.displayName,
                    date: messageContent.date
                });

                const newMessage = await message.save();

                console.log('Message sauvegardé :', newMessage);
                console.log('Contenu du message :', messageContent);
                console.log('User :', user);

                io.emit('newMessage', {
                    content: newMessage.content,
                    sender: {
                        _id: messageContent.sender._id,
                        displayName: messageContent.sender.displayName,
                        profilePicture: messageContent.sender.profilePicture
                    },
                    date: newMessage.date
                });
            } catch (err) {
                console.error('Erreur lors de la sauvegarde du message :', err);
            }
        } else {
            console.log('Utilisateur non authentifié');
        }
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
