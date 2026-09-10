import { EventRepository } from '../repositories/event.repository.js';

export class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async fetchEvents() {
    return await this.eventRepository.getEvents();
  }
}