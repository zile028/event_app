const EventModel = require("../../models/EventModel");
const path = require("path");
const UserModel = require("../../models/UserModel");


const MB = 1024 * 1024;
const validType = ["image/png", "image/jpg", "image/jpeg"];

const createEvent = async (req, res) => {
    try {
        const { title, decription, user, startAt, endAt } = req.body;
        const file = req.files?.thumbnail;

        const errors = {};

      
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

       
        if (!file) {
            errors.thumbnail = "Nije izabrana slika";
        } else {
            if (file.size > 5 * MB) {
                errors.thumbnail = "Fajl je prevelik";
            }
            if (!validType.includes(file.mimetype)) {
                errors.thumbnail = "Fajl nije podržan tip";
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.render("event/createView", { errors, users: req.users, formData: req.body });
        }

      
        const uploadDir = path.join(__dirname, "../../upload");
        const fileExt = path.extname(file.name);
        const fileName = `${Date.now()}${fileExt}`;
        const filePath = path.join(uploadDir,fileName);
        await file.mv(filePath);

        
        const newEvent = new EventModel({
            title,
            decription,
            user,
            startAt,
            endAt,
            thumbnail: fileName
        });

        await newEvent.save();
        
        
        res.redirect("/event/gallery");

    } catch (error) {
        console.log(error);
        res.status(500).send("Greška pri kreiranju događaja");
    }
};

module.exports = createEvent;
