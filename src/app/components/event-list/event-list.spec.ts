import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventList, EVENTS } from './event-list';

describe('EventList', () => {
  let component: EventList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventList],
      providers: [provideRouter([])],
    }).compileComponents();
    component = TestBed.createComponent(EventList).componentInstance;
  });

  it('contient au moins 6 événements, 3 catégories et 2 événements gratuits', () => {
    expect(EVENTS.length).toBeGreaterThanOrEqual(6);
    expect(new Set(EVENTS.map((e) => e.category)).size).toBeGreaterThanOrEqual(3);
    expect(EVENTS.filter((e) => e.price === 0).length).toBeGreaterThanOrEqual(2);
  });

  it('affiche tous les événements au départ', () => {
    expect(component.filteredEvents().length).toBe(EVENTS.length);
  });

  it('filtre par catégorie', () => {
    component.selectCategory('Sport');
    expect(component.filteredEvents().every((e) => e.category === 'Sport')).toBe(true);
    expect(component.filteredEvents().length).toBeGreaterThan(0);
  });

  it('ajoute et retire un favori et met à jour le compteur', () => {
    component.toggleFavorite(1);
    expect(component.favoritesCount()).toBe(1);
    expect(component.isFavorite(1)).toBe(true);
    component.toggleFavorite(1);
    expect(component.favoritesCount()).toBe(0);
  });

  it('renvoie une liste vide quand il n’y a aucun favori et que le filtre favoris est actif', () => {
    component.toggleFavoritesOnly();
    expect(component.filteredEvents().length).toBe(0);
  });
});
