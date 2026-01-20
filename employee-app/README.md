# Employee Search Application

Application React pour rechercher et gérer des employés de différentes entreprises.

## Fonctionnalités

- 🔍 Recherche d'employés par nom d'entreprise
- ⭐ Système de favoris avec localStorage
- 🗺️ Carte interactive avec Leaflet
- 📱 Design responsive (mobile-friendly)
- 🎯 Context API pour la gestion d'état globale
- 🔄 React Router pour la navigation

## Technologies utilisées

- React 18
- Vite
- React Router DOM
- Leaflet & React Leaflet
- API RandomUser
- Context API
- localStorage

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir le navigateur à l'adresse : `http://localhost:3000`

## Structure du projet

```
employee-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   └── EmployeeCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── EmployeeDetails.jsx
│   │   ├── FavoriteDetails.jsx
│   │   └── Favorites.jsx
│   ├── context/
│   │   └── EmployeeContext.jsx
│   ├── styles/
│   │   └── ... (fichiers CSS)
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Routes

- `/` - Page d'accueil avec recherche
- `/?search=nom_entreprise` - Résultats de recherche
- `/employee/:id` - Détails d'un employé
- `/favs` - Liste des favoris
- `/fav/:id` - Détails d'un favori

## API

L'application utilise l'API RandomUser :
- URL principale : `https://randomuser.me/api/?results=10&seed=nom_entreprise`
- URL de secours : `https://monkeys.co.il/api2/wo.php`

## Build pour production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

## Déploiement

L'application peut être déployée sur :
- Netlify
- Vercel
- GitHub Pages

## Auteur

Projet développé dans le cadre d'un cours universitaire React.
