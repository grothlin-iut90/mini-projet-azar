# Mini-Projet 2 – Authentification Vue.js & Node.js

## Prérequis

- Node.js (v18+ recommandé)
- npm (fourni avec Node.js)
- MySQL (pour la base de données)

## Installation

### 1. Cloner le projet

```sh
git clone https://github.com/grothlin-iut90/mini-projet-azar.git
cd mini-projet2
```

### 2. Configuration de la base de données

- Crée une base de données MySQL nommée `mini_projet2`.
- Modifie le fichier `backend/.env` si besoin pour vos identifiants MySQL.
- Votre .env doit ressembler à ceci :
```bash
DB_NAME=mini_projet2
DB_USER=<pseudo_de_votre_bdd>
DB_PASS=<mdp_de_votre_bdd>
DB_HOST=localhost
JWT_SECRET=90bbb84e12c58434fa3e9e4c89a555e273b7a4774400abc9d4b1bd385e390965
```

### 3. Installation des dépendances

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

## Lancement du projet

### 1. Lancer le backend

```sh
cd backend
node server.js
```

### 2. Lancer le frontend

Dans un autre terminal :

```sh
cd frontend
npm run dev
```

Le frontend sera accessible sur [http://localhost:5173](http://localhost:5173).

## Commandes utiles

### Backend

- `npm install` : Installer les dépendances
- `node server.js` : Lancer le serveur Express

### Frontend

- `npm install` : Installer les dépendances
- `npm run dev` : Lancer le serveur de développement Vite

## Auteurs

- RÖTHLIN Gaël
