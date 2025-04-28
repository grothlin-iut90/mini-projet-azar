# Mini-Projet 1

## Prérequis

- Node.js (v18+ recommandé)
- npm
- MySQL (base de données configurée dans `backend/.env`)

### Configuration de la base de données

- Crée une base de données MySQL nommée `mini_projet1`.
- Modifie le fichier `backend/.env` si besoin pour vos identifiants MySQL.
- Votre .env doit ressembler à ceci :
```bash
PORT=3000
DB_NAME=mini_projet1
DB_USER=<pseudo_de_votre_bdd>
DB_PASSWORD=<mdp_de_votre_bdd>
```

---

## Installation

### 1. Backend

```sh
cd backend
npm install
```

### 2. Frontend

```sh
cd frontend
npm install
```

---

## Lancement du projet

### 1. Démarrer le backend

Depuis le dossier `backend` :

```sh
node server.js
```

Le backend sera accessible sur [http://localhost:3000](http://localhost:3000).

### 2. Démarrer le frontend

Depuis le dossier `frontend` :

```sh
npm run dev
```

Le frontend sera accessible sur [http://localhost:5173](http://localhost:5173).


## Auteurs

- RÖTHLIN Gaël