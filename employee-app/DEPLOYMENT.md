# Instructions de Déploiement

## Déploiement sur Netlify

1. Créer un compte sur https://www.netlify.com
2. Pousser votre code sur GitHub
3. Dans Netlify, cliquer sur "New site from Git"
4. Sélectionner votre repository GitHub
5. Configuration de build :
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Cliquer sur "Deploy site"

### Configuration manuelle (alternative)

1. Exécuter localement : `npm run build`
2. Dans Netlify, glisser-déposer le dossier `dist` dans la zone de déploiement

## Déploiement sur Vercel

1. Créer un compte sur https://vercel.com
2. Installer Vercel CLI : `npm i -g vercel`
3. Dans le dossier du projet, exécuter : `vercel`
4. Suivre les instructions à l'écran

### Via l'interface web

1. Pousser votre code sur GitHub
2. Sur Vercel, cliquer sur "New Project"
3. Importer votre repository GitHub
4. Vercel détectera automatiquement Vite
5. Cliquer sur "Deploy"

## GitHub Pages

1. Installer gh-pages : `npm install --save-dev gh-pages`
2. Ajouter dans package.json :
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Modifier vite.config.js :
```js
export default defineConfig({
  base: '/employee-app/',
  plugins: [react()],
})
```
4. Exécuter : `npm run deploy`

## Après le déploiement

N'oubliez pas de :
- Tester toutes les fonctionnalités sur le site déployé
- Vérifier la responsivité sur mobile
- Tester l'ajout/suppression de favoris
- Vérifier que la carte Leaflet fonctionne correctement
