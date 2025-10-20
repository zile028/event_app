const EventModel = require("../../models/EventModel");
const path = require("path");

const MB = 1024 * 1024;
const validType = ["image/png", "image/jpg", "image/jpeg"];

const createEvent = async (req, res) => {
    try {
        const errors = {};
        const user = req.session.user ? req.session.user._id : undefined;
        const {title, description, startAt, endAt} = req.body;
        const file = req.files?.thumbnail;

        // Provera obaveznih polja
        if (!title || !description || !user || !startAt || !endAt) {
            return res.send({message: "Sva polja su obavezna!"});
        }

        if (!title || title.length < 5) {
            errors.title = "Naslov mora imati najmanje 5 karaktera";
        }

        if (!decription || decription.length < 10) {
            errors.description = "Opis mora imati najmanje 10 karaktera";
        }
        if (!user) {
            errors.user = "Morate izabrati autora";
        }
        if (!startAt) {
            errors.startAt = "Morate uneti početak događaja";
        }
        if (!endAt) {
            errors.endAt = "Morate uneti kraj događaja";
        }

        // Provera fajla
        if (!req.files || !req.files.thumbnail) {
            return res.send({message: "Naslovna slika je obavezna!"});
        }

        const thumbnailFile = req.files.thumbnail;
        const extension = path.extname(thumbnailFile.name);
        const storeName = new Date().getTime().toString() + extension;
        const uploadPath = path.join(
            __dirname,
            "../../public/uploads/",
            storeName
        );
        await thumbnailFile.mv(uploadPath);

        // Kreiranje eventa
        const event = new EventModel({
            title,
            thumbnail: "/uploads/" + storeName,
            description,
            user,
            startAt,
            endAt
        });
        await event.save();
        res.redirect("/event");
    } catch (error) {
        res.render("event/createView", {
            message: "Greška pri kreiranju događaja!",
            user: req.session.user
        });
    }
};


module.exports = createEvent;
