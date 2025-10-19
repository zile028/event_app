const EventModel = require("../../models/EventModel");

const listEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ createdAt: -1 });
    res.render("event/listView", { events, user: req.session.user });
  } catch (error) {
    res.send({ message: "Greška pri učitavanju događaja!", error });
  }
};

module.exports = listEvents;
