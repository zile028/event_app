const EventModel = require("../../models/EventModel");
const dayjs = require("dayjs");

const galleryView = async (req, res) => {
    try {
        const event = await EventModel.find();
        console.log(event);


        const events = await EventModel.find().populate("user", "firstName");

        res.render("event/galleryView", { user: req.session.user, event: events, dayjs });

    } catch (error) {
        res.status(500).send(error.message);
    }


};

module.exports = galleryView;