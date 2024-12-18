const Event = require("../models/event");

const getAllEvents = async (req, res) => {
  try {
    const queryParam = req.query;
    const filteredEvents = await Event.find(queryParam);
    if (filteredEvents.length > 0) {
      res.json(filteredEvents);
    } else {
      res.ststus(404).json({ message: "No events found" });
    }
  } catch (e) {
    console.error("Error getting events: ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.find({ id: req.params.id });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (e) {
    console.error("Error getting event by id: ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postEvent = async (req, res) => {
  const { id, title, date, location } = req.body;

  try {
    const newEvent = await Event.create({ id, title, date, location });
    res.status(201).json(newEvent);
  } catch (e) {
    res.status(400).send(e);
  }
};

const putEvent = async (req, res) => {
  const { title, date, location } = req.body;
  try {
    const updates = {};
    if (title) updates.title = title;
    if (date) updates.date = date;
    if (location) updates.location = location;
    const updatedEvent = await Event.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { $set: updates },
      { new: true }
    );
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (e) {
    console.error("Error updating event: ", e);
    res.status(400).send("Failed to update event", e);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const result = await Event.deleteOne({ id: parseInt(req.params.id) });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (e) {
    console.error("Error deleting event: ", e);
    res.status(400).send("Failed to delete event", e);
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  postEvent,
  putEvent,
  deleteEvent,
};
