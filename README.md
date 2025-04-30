# mini-projet-azar

## Membres du groupe

- **RÖTHLIN Gaël** : mini-projet1, mini-projet2 et mini-projet3
- **BERNARD Elena** : mini-projet3

---

## Description du projet

Ce dépôt regroupe trois mini-projets réalisés dans le cadre du module Service Web (S4) à l'IUT Nord Franche-Comté.  
Chaque mini-projet explore différentes technologies et concepts autour du développement web moderne :

<details>
<summary><strong>mini-projet1 :</strong> Application fullstack (Node.js + Vue.js (Vite)) – mise en place d’une interface utilisateur réactive.</summary><br>

<strong>Technologies utilisées :</strong>
- Backend : Node.js avec Express.js et Passport.js
- Frontend : Vue.js
- Base de données : PostgreSQL ou MySQL avec Sequelize ORM
- Session : Gestion des cookies et sessions

<strong>Fonctionnalités :</strong>
- Inscription des utilisateurs
- Connexion avec vérification des identifiants
- Page d’accueil sécurisée après connexion
- Stockage des sessions dans des cookies
</details>
<details>
<summary><strong>mini-projet2 :</strong> Application fullstack (Node.js/Express + Vue.js) – gestion d’une API REST et d’un frontend associé.</summary><br>

<strong>Technologies utilisées :</strong>
- Backend : Node.js avec Express.js et JWT
- Frontend : Vue.js
- Base de données : PostgreSQL ou MySQL avec Sequelize ORM
- Stockage du token : LocalStorage ou SessionStorage

<strong>Fonctionnalités :</strong>
- Inscription des utilisateurs
- Connexion avec génération et validation de JWT
- Page d’accueil sécurisée avec JWT
- Gestion du token côté client


</details>
<details>
<summary><strong>mini-projet3 :</strong> Application Node.js avec MongoDB – manipulation de données NoSQL et authentification.</summary><br>

<strong>Technologies utilisées :</strong>
- Backend : Node.js avec Express.js et Passport.js (Google Strategy)
- Frontend : Vue.js
- Base de données : MongoDB avec Mongoose
- Mise en cache : Redis
- Websockets : Socket.io

<strong>Fonctionnalités :</strong>
- Authentification OAuth2 via Google + un autre
- Stockage des utilisateurs et tokens dans MongoDB
- Mise en cache des sessions avec Redis
- Interface de chat entre utilisateurs connectés
- Stockage de l’historique des messages dans MongoDB

<strong>Objectifs pédagogiques :</strong>
- Comprendre les différentes méthodes d’authentification
- Maîtriser la gestion des sessions via cookies et JWT
- Implémenter une authentification OAuth2 avec un fournisseur tiers
- Mettre en place un système de chat en temps réel
- Optimiser la gestion des sessions avec Redis
</details>
<br>
L’organisation du dépôt est la suivante :

```
azar-projet/
│
├── mini-projet1/
│   ├── backend/
│   └── frontend/
├── mini-projet2/
│   ├── backend/
│   └── frontend/
└── mini-projet3/
    ├── backend/
    └── frontend/
```

---

## Sommaire

- [mini-projet-azar](#mini-projet-azar)
  - [Membres du groupe](#membres-du-groupe)
  - [Description du projet](#description-du-projet)
  - [Sommaire](#sommaire)
  - [Instructions pour exécuter le projet](#instructions-pour-exécuter-le-projet)
    - [Prérequis](#prérequis)
    - [Installation et lancement](#installation-et-lancement)
      - [mini-projet1 (Frontend Vue.js) - RÖTHLIN Gaël](#mini-projet1-frontend-vuejs---röthlin-gaël)
      - [mini-projet2 (Backend + Frontend) - RÖTHLIN Gaël](#mini-projet2-backend--frontend---röthlin-gaël)
      - [mini-projet3 (Node.js + MongoDB) - RÖTHLIN Gaël, BERNARD Elena](#mini-projet3-nodejs--mongodb---röthlin-gaël-bernard-elena)
  - [⚠️ Remarque importante](#️-remarque-importante)

---

## Instructions pour exécuter le projet

### Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (installé avec Node.js)
- (Pour mini-projet3) Une instance MongoDB locale ou distante

### Installation et lancement

#### mini-projet1 (Frontend Vue.js) - RÖTHLIN Gaël

**Backend :**

```sh
cd mini-projet2/backend
npm install
node server.js
```

```sh
cd mini-projet1/frontend
npm install
npm run dev
```

#### mini-projet2 (Backend + Frontend) - RÖTHLIN Gaël

**Backend :**

```sh
cd mini-projet2/backend
npm install
node server.js
```

**Frontend :**

```sh
cd mini-projet2/frontend
npm install
npm run dev
```

#### mini-projet3 (Node.js + MongoDB) - RÖTHLIN Gaël, BERNARD Elena

**Prérequis :**
- [Node.js](https://nodejs.org/) (v16 ou supérieure)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local ou distant)
- [Redis](https://redis.io/) (pour la gestion des sessions)
- Variables d’environnement pour l’authentification OAuth2 (Google, Github.)

**Backend :**

```sh
cd mini-projet3/backend
npm install
# Copier .env.example en .env et compléter les variables nécessaires (MongoDB URI, clés OAuth, etc.)
npm start
```

**Frontend :**

```sh
cd mini-projet3/frontend
npm install
npm run dev
```

**Remarques :**
- Votre `config/dev.js` doit avoir la forme suivante :
```javascript
module.exports = {
  googleClientID: '<your_google_client_id>',
  googleClientSecret: '<your_google_client_secret>',
  githubClientID: '<your_github_client_id>',
  githubClientSecret: '<your_client_secret>',
  mongoURI: '<your_mongo_db_URI>',
  cookieKey: 'your-cookie-key',
  redisUrl: 'redis://localhost:5173'
};
```

- Assurez-vous que MongoDB et Redis sont démarrés avant de lancer le backend.
- Les informations de configuration (URI MongoDB, clés OAuth, etc.) doivent être renseignées dans le fichier `config/dev.js` du backend.
- Pour l’authentification Google, crée un projet sur la [console Google Cloud](https://console.cloud.google.com/)
  - Créez un nouveau projet et rendez-vous dans la rubrique '**API et Services**'
  - Allez dans '**Credentials**' et créez de nouveaux credentials de type '**ID client OAuth**' 
  - Sélectionnez 'Application Web' et insérez `http://localhost:5173/` dans '**URI de redirection autorisés**'
  - Enregistrez les credentials et copiez collez les clients id/secret dans le fichier `config/dev.js`
- Pour Github, rendez-vous sur le site suivant [github developers](https://github.com/settings/developers)
  - Cliquez sur 'New OAuth App'
  - Indiquez le nom que vous voulez
  - Insérez `http://localhost:5173/` dans 'Homepage URL' et `http://localhost:5000/auth/github/callback` dans 'Authorization callback URL'
  - vous devez ensuite récupérer un nouvel 'client secret', en cliquant sur 'Generate a new client secret', copiez ce **client secret** et insérez le dans le fichier `config/dev.js` dans le back end, faites de même pour le **client id**

## ⚠️ Remarque importante

> **ℹ️ Chaque sous-dossier contient un `README.md` spécifique avec des instructions complémentaires, lisez-les attentivement !**
