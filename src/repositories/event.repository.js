import { EventDao } from '../dao/event.dao.js';

export class EventRepository {
  constructor() {
    this.eventDao = new EventDao();
  }

  async getEvents() {
    return await this.eventDao.getAll();
  }
}