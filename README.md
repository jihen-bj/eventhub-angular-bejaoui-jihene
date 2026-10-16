# EventHub — Catalogue d'événements

Mini-projet **Angular 21** (IACC) — travail individuel de **Jihen Bejaoui**.
Dossier du projet : `jihenbejaoui4ssa16minipro`

## 1. Description

EventHub est une application Angular **standalone** destinée à une association étudiante. Elle permet de :

- consulter une liste d'événements (ateliers, conférences, rencontres, compétitions, sport) ;
- filtrer la liste par catégorie ;
- ajouter / retirer des événements de ses favoris (avec compteur) ;
- ouvrir la page de détails d'un événement ;
- lire une page « À propos » chargée en **lazy loading**.

Le projet est exclusivement côté client : les données sont définies dans le code TypeScript (aucune API, base de données ni authentification).

## 2. Versions utilisées

| Outil | Version |
|---|---|
| Angular / Angular CLI | 21.2.x |
| Node.js | 24.x (testé aussi avec 22.x) |
| npm | 11.x |
| TypeScript | 5.9 |
| Tests unitaires | Vitest (par défaut dans Angular 21) |

## 3. Installation et lancement

```bash
cd jihenbejaoui4ssa16minipro
npm install
ng serve
```

Ouvrir ensuite <http://localhost:4200> (ou `ng serve --open`).

Autres commandes utiles :

```bash
ng build                 # compilation de production (dossier dist/)
ng test --watch=false    # tests unitaires
```

## 4. Structure du projet

```
src/app/
├── app.ts / app.html / app.css     Composant racine (header + <router-outlet> + footer)
├── app.config.ts                   provideRouter(routes, withComponentInputBinding()) + locale fr
├── app.routes.ts                   Définition des routes
├── models/
│   └── event.model.ts              Interface EventItem
└── components/
    ├── header/                     Header
    ├── event-list/                 EventList (données + Signals + filtre)
    ├── event-card/                 EventCard
    ├── event-details/              EventDetails
    ├── about/                      About (lazy loading)
    └── not-found/                  NotFound
public/assets/                      Images des événements (SVG)
```

### Rôle des composants

- **Header** : affiche le titre de l'application et le menu de navigation ; `routerLinkActive` met en évidence la page active.
- **EventList** : contient les 8 événements dans un Signal, les favoris, le filtre de catégorie et le compteur de favoris ; affiche les cartes avec `@for` / `@empty`.
- **EventCard** : présente un événement (image, titre, date, prix, catégorie) reçu par `input()`, propose le lien « Voir les détails » et le bouton favori qui émet un `output()` vers le parent.
- **EventDetails** : lit le paramètre de route `:id` (via `input()` + `withComponentInputBinding()`) et affiche l'événement correspondant, ou un message si l'identifiant n'existe pas.
- **NotFound** : page 404 affichée pour toute URL inconnue (`**`).
- **About** : page de présentation de l'application, chargée à la demande avec `loadComponent()`.

## 5. Fonctionnalités réalisées

- Architecture **standalone** (aucun NgModule).
- **Signals** : `signal()`, `computed()`, lecture avec `()`, modification avec `set()` et `update()`
  (liste, favoris, catégorie sélectionnée, option « favoris uniquement »).
- **Data binding** : interpolation `{{ }}`, property binding `[src]`, `[alt]`, `[class.active]`, event binding `(click)`.
- **Control flow** : `@for (...; track event.id)`, `@if / @else`, `@empty` (« Aucun événement disponible »).
- **Pipes** : `date`, `currency`, `uppercase`.
- **Communication parent / enfant** : `input()` / `input.required()` et `output()`.
- **Routage** : `provideRouter()`, `<router-outlet>`, `routerLink`, `routerLinkActive`, route paramétrée `/events/:id`, redirection de `''` vers `/events`, route `**`.
- **Lazy loading** de `/about` avec `loadComponent()` (chunk séparé `about` généré au build).
- Interface **responsive** (ordinateur et téléphone).

### Routes

| URL | Composant |
|---|---|
| `/` | redirection vers `/events` |
| `/events` | EventList |
| `/events/:id` | EventDetails |
| `/about` | About (lazy) |
| `**` | NotFound |

## 6. Jeu de données

8 événements, 5 catégories (Atelier, Conférence, Sport, Compétition, Rencontre), dont 3 gratuits.
Chaque événement possède : `id`, `title`, `category`, `date`, `place`, `price`, `imageUrl`, `description`.

## 7. Tests manuels

| # | Cas testé | Résultat attendu |
|---|---|---|
| 1 | Affichage initial | 8 cartes, compteur de favoris à 0 |
| 2 | Filtre de catégorie | Seules les cartes de la catégorie choisie sont affichées |
| 3 | Liste vide | Activer « Mes favoris uniquement » sans favori → « Aucun événement disponible » |
| 4 | Ajout / retrait de favori | Le bouton change d'état, le compteur est mis à jour |
| 5 | Navigation vers un détail | « Voir les détails » ouvre `/events/:id` |
| 6 | Identifiant inexistant | `/events/999` affiche « Événement introuvable » |
| 7 | Lien actif | Le lien du menu de la page courante est mis en évidence |
| 8 | URL inconnue | `/xyz` affiche la page 404 |
| 9 | Chargement de `/about` | Onglet **Network** : un fichier JS (chunk `about`) est téléchargé à la première visite |

Les tests unitaires (`ng test`) vérifient le jeu de données, le filtre, les favoris, le compteur et la liste vide.

## 8. Captures d'écran

À placer dans `docs/screenshots/` puis référencer ici :

![Liste des événements](docs/screenshots/liste.png)
![Filtre par catégorie](docs/screenshots/filtre.png)
![Détails d'un événement](docs/screenshots/details.png)
![Page About / 404](docs/screenshots/about.png)

## 9. Git

```bash
git init
git add .
git commit -m "Initialisation du mini-projet EventHub"
git branch -M main
git remote add origin URL_DU_DEPOT
git push -u origin main
```

Le dossier `node_modules/` est ignoré grâce au `.gitignore` généré par Angular CLI.
