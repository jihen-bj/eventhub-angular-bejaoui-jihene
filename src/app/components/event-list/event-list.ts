import { Component, computed, signal } from '@angular/core';
import { EventItem } from '../../models/event.model';
import { EventCard } from '../event-card/event-card';

// Jeu de données : 8 événements, 5 catégories, 3 événements gratuits
export const EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Atelier TypeScript',
    category: 'Atelier',
    date: '2026-11-15',
    place: 'Campus',
    price: 0,
    imageUrl: 'assets/typescript.svg',
    description:
      'Découverte de TypeScript : types, interfaces, génériques et bonnes pratiques pour bien démarrer avec Angular.',
  },
  {
    id: 2,
    title: 'Conférence IA & Avenir',
    category: 'Conférence',
    date: '2026-11-22',
    place: 'Amphithéâtre A',
    price: 15,
    imageUrl: 'assets/ia.svg',
    description:
      "Des experts présentent les tendances de l'intelligence artificielle et leur impact sur les métiers de demain.",
  },
  {
    id: 3,
    title: 'Tournoi de Football',
    category: 'Sport',
    date: '2026-12-05',
    place: 'Stade universitaire',
    price: 5,
    imageUrl: 'assets/football.svg',
    description:
      'Tournoi inter-classes en équipes de 7 joueurs. Inscrivez votre équipe et venez défendre vos couleurs !',
  },
  {
    id: 4,
    title: 'Atelier Angular Signals',
    category: 'Atelier',
    date: '2026-12-10',
    place: 'Laboratoire 3',
    price: 10,
    imageUrl: 'assets/signals.svg',
    description:
      'Atelier pratique sur signal(), computed() et input()/output() pour construire des interfaces réactives.',
  },
  {
    id: 5,
    title: 'Conférence Cybersécurité',
    category: 'Conférence',
    date: '2026-12-18',
    place: 'Amphithéâtre B',
    price: 0,
    imageUrl: 'assets/cyber.svg',
    description:
      'Sensibilisation aux menaces actuelles, aux bonnes pratiques de sécurité et aux métiers de la cybersécurité.',
  },
  {
    id: 6,
    title: 'Hackathon Étudiant',
    category: 'Compétition',
    date: '2027-01-14',
    place: 'Campus',
    price: 20,
    imageUrl: 'assets/hackathon.svg',
    description:
      '24 heures pour imaginer, concevoir et présenter un prototype. Lots à gagner et accompagnement par des mentors.',
  },
  {
    id: 7,
    title: 'Rencontre Entrepreneurs',
    category: 'Rencontre',
    date: '2027-01-25',
    place: 'Salle de conférence',
    price: 0,
    imageUrl: 'assets/entrepreneurs.svg',
    description:
      "Échangez avec des entrepreneurs et des anciens élèves sur leur parcours et les opportunités de stage.",
  },
  {
    id: 8,
    title: 'Tournoi de Padel',
    category: 'Sport',
    date: '2027-02-08',
    place: 'Club sportif',
    price: 12,
    imageUrl: 'assets/padel.svg',
    description:
      'Tournoi de padel en double, ouvert à tous les niveaux. Matchs amicaux et ambiance conviviale garantis.',
  },
];

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  // Liste des événements et favoris stockés dans des Signals
  readonly events = signal<EventItem[]>(EVENTS);
  readonly favorites = signal<number[]>([]);

  // Filtres : catégorie sélectionnée + option « favoris uniquement »
  readonly selectedCategory = signal<string>('Tous');
  readonly favoritesOnly = signal(false);

  // Valeurs dérivées
  readonly categories = computed(() => [
    'Tous',
    ...new Set(this.events().map((e) => e.category)),
  ]);
  readonly favoritesCount = computed(() => this.favorites().length);
  readonly filteredEvents = computed(() => {
    const category = this.selectedCategory();
    const onlyFavs = this.favoritesOnly();
    const favs = this.favorites();
    return this.events().filter(
      (e) =>
        (category === 'Tous' || e.category === category) &&
        (!onlyFavs || favs.includes(e.id)),
    );
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  toggleFavoritesOnly(): void {
    this.favoritesOnly.update((v) => !v);
  }

  isFavorite(id: number): boolean {
    return this.favorites().includes(id);
  }

  // Appelée quand EventCard émet (favoriteToggled)
  toggleFavorite(id: number): void {
    this.favorites.update((list) =>
      list.includes(id) ? list.filter((fid) => fid !== id) : [...list, id],
    );
  }
}
