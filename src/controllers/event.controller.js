import { EventService } from '../services/event.service.js';

const eventService = new EventService();

export const getEvents = async (req, res, next) => {
  try {
    const events = await eventService.fetchEvents();
    res.status(200).json({ status: 'success', data: events });
  } catch (error) {
    next(error);
  }
};