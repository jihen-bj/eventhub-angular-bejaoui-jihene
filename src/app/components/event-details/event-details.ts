import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EVENTS } from '../event-list/event-list';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  // Paramètre de route :id, injecté grâce à withComponentInputBinding()
  readonly id = input<string>();

  // Événement correspondant (undefined si l'identifiant n'existe pas)
  readonly event = computed(() => EVENTS.find((e) => e.id === Number(this.id())));
}
