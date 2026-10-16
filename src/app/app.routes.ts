import { Routes } from '@angular/router';
import { EventDetails } from './components/event-details/event-details';
import { EventList } from './components/event-list/event-list';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventList, title: 'EventHub | Événements' },
  { path: 'events/:id', component: EventDetails, title: 'EventHub | Détails' },
  {
    // Lazy loading : le code de About n'est téléchargé qu'à la première visite de /about
    path: 'about',
    loadComponent: () => import('./components/about/about').then((m) => m.About),
    title: 'EventHub | À propos',
  },
  { path: '**', component: NotFound, title: 'EventHub | Page introuvable' },
];
