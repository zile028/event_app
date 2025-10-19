const EventModel = require("../../models/EventModel");
const UserModel = require("../../models/UserModel");

const listEvents = async (req, res) => {
  try {
    // Pronađi sve evente i popuni podatke o korisniku
    const events = await EventModel.find().sort({ createdAt: -1 });
    // Dohvati korisnike za svaki event
    const eventsWithUser = await Promise.all(
      events.map(async (event) => {
        let userName = "Nepoznat korisnik";
        if (event.user) {
          const user = await UserModel.findById(event.user);
          if (user) userName = user.firstName + " " + user.lastName;
        }
        return { ...event._doc, userName };
      })
    );
    res.render("event/listView", {
      events: eventsWithUser,
      user: req.session.user,
    });
  } catch (error) {
    res.send({ message: "Greška pri učitavanju događaja!", error });
  }
};

module.exports = listEvents;
