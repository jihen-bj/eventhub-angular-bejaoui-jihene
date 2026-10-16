import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventItem } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  // Reçoit l'événement depuis EventList (input)
  readonly event = input.required<EventItem>();
  readonly isFavorite = input(false);

  // Signale au parent le clic sur le bouton favori (output)
  readonly favoriteToggled = output<number>();

  protected onToggleFavorite(): void {
    this.favoriteToggled.emit(this.event().id);
  }
}
