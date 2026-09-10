export class Event {
  constructor({ id, title, description, date, capacity }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.capacity = capacity;
    this.createdAt = new Date();
  }
}