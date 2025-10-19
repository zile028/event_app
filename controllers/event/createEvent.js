const EventModel = require("../../models/EventModel");

const path = require("path");

const createEvent = async (req, res) => {
  try {
    const { title, description, startAt, endAt } = req.body;
    const user = req.session.user ? req.session.user._id : undefined;

    // Provera obaveznih polja
    if (!title || !description || !user || !startAt || !endAt) {
      return res.send({ message: "Sva polja su obavezna!" });
    }

    // Provera fajla
    if (!req.files || !req.files.thumbnail) {
      return res.send({ message: "Naslovna slika je obavezna!" });
    }
    const thumbnailFile = req.files.thumbnail;
    const uploadPath = path.join(
      __dirname,
      "../../public/uploads/",
      thumbnailFile.name
    );
    await thumbnailFile.mv(uploadPath);

    // Kreiranje eventa
    const event = new EventModel({
      title,
      thumbnail: "/uploads/" + thumbnailFile.name,
      description,
      user,
      startAt,
      endAt,
    });
    await event.save();
    res.redirect("/event");
  } catch (error) {
    res.render("event/createView", {
      message: "Greška pri kreiranju događaja!",
      user: req.session.user,
    });
  }
};

module.exports = createEvent;
