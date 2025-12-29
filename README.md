# Dashboard SaaS

Un dashboard SaaS moderne construit avec Next.js, TypeScript, Tailwind CSS et shadcn/ui.

## 🚀 Technologies

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Styles utilitaires
- **shadcn/ui** - Composants UI
- **Zustand** - Gestion d'état
- **Recharts** - Graphiques
- **Lucide React** - Icônes

## 📦 Installation

```bash
npm install
```

## 🏃 Développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## 📁 Structure du projet

```
src/
├── app/              # Pages Next.js
│   └── (dashboard)/  # Routes du dashboard
├── components/       # Composants React
│   ├── layout/      # Layout components
│   └── ui/          # Composants shadcn/ui
├── lib/             # Utilitaires
│   ├── data/        # Données mock
│   └── store/       # Store Zustand
└── types/           # Types TypeScript
```

## 🎨 Fonctionnalités

- ✅ Types TypeScript pour User, KPI, Activity, ChartData
- ✅ Thème clair/sombre avec shadcn/ui
- ✅ Composants UI réutilisables
- ✅ Structure de dashboard prête

## 📝 Scripts

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Lint le code

## 🚢 Déploiement

Le projet peut être déployé sur [Vercel](https://vercel.com) facilement.
