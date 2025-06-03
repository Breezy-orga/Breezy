# Breezy

Application web moderne construite avec Next.js et Node.js.

## Structure du Projet

```
breezy/
├── backend/           # API Node.js/Express
├── frontend/         # Application Next.js
└── docker/           # Configuration Docker
```

## Technologies Utilisées

### Backend
- Node.js & Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Docker pour le déploiement

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Axios pour les requêtes HTTP

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB
- Docker
- pnpm (gestionnaire de paquets)

### Installation du Backend
```bash
cd backend
pnpm install
```

### Installation du Frontend
```bash
cd frontend
pnpm install
```

## Démarrage

### Backend
```bash
cd backend
pnpm dev
```

### Frontend
```bash
cd frontend
pnpm dev
```

## Variables d'Environnement

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/breezy
JWT_SECRET=your_jwt_secret
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Licence

MIT
