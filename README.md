# Ismail 3000

Le site de référence de la QA augmentée par l'IA, par Ismail Haiber. Site statique construit avec [Astro](https://astro.build) et hébergé sur Netlify.

## Contenu

Tout le contenu se modifie depuis l'admin, sur `/admin`, avec une connexion GitHub ([Sveltia CMS](https://github.com/sveltia/sveltia-cms), compatible Decap CMS) :

- `src/content/profil.json` : le profil (statut, parcours, services, stack, certifications, contact)
- `src/content/reglages.json` : réglages du site, bandeau d'annonce, accueil, réseaux sociaux, newsletter, statistiques
- `public/uploads/` : photos et fichiers envoyés depuis l'admin

Chaque modification publiée depuis l'admin crée un commit sur `main`, et Netlify reconstruit et redéploie le site automatiquement.

## Développement

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # génère le site dans dist/
npm test         # tests Playwright (ordinateur et mobile)
```

## Organisation

- `src/pages/` : une page par URL (`/`, `/profil/`, `/contact/`, `/newsletter/`... et leurs versions `/en/`)
- `src/views/` : le contenu de chaque page, partagé entre le français et l'anglais
- `src/components/` : en-tête, pied de page, héros, formulaire newsletter, réseaux sociaux
- `src/i18n/ui.ts` : textes fixes FR/EN et correspondance des URL entre les deux langues
- `src/styles/global.css` : le thème néon
- `tests/` : tests Playwright du site, lancés à chaque pull request

## Nom de domaine

Le jour où un domaine est branché : définir `SITE_URL` dans les variables d'environnement Netlify (ou changer la valeur par défaut dans `astro.config.mjs`), et décommenter la redirection en bas de `netlify.toml`.
