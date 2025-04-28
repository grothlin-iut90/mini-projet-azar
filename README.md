# mini-projet-azar

## Membres du groupe

- **RÖTHLIN Gaël** : mini-projet1 et mini-projet2
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
      - [mini-projet3 (Node.js + MongoDB) - BERNARD Elena](#mini-projet3-nodejs--mongodb---bernard-elena)
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

#### mini-projet3 (Node.js + MongoDB) - BERNARD Elena

## ⚠️ Remarque importante

> **ℹ️ Chaque sous-dossier contient un `README.md` spécifique avec des instructions complémentaires, lisez-les attentivement !**
