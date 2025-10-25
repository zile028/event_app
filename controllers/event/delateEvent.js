const EventModel = require("../../models/EventModel");
const fs = require("fs");
const {UPLOAD_DIR} = require("../../config");
const path = require("node:path");
const deleteEvent = async (req, res) => {
    try {
        const user = req.session.user;

        if (!user) {
            return res.status(401).send("Moraš biti ulogovan da bi obrisao event.");
        }

        const {id} = req.params;
        const event = await EventModel.findById(id);
        const thumbnail = event.thumbnail;
        if (!event) {
            return res.status(404).send("Event ne postoji");
        }


        const isOwner = event.user.toString() === user._id.toString();
        const isAdmin = user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).send("Nemaš dozvolu da obrišeš ovaj event.");
        }

        await EventModel.deleteOne({_id: id});
        if (fs.existsSync(path.join(UPLOAD_DIR, thumbnail))) {
            fs.unlinkSync(path.join(UPLOAD_DIR, thumbnail));
        }

        console.log(req.headers.referer);
        const previousPage = req.get("referer");
        return res.redirect(previousPage || "/event");

    } catch (error) {
        console.log(error);
        res.status(500).send("Greška pri brisanju eventa.");
    }
};

module.exports = deleteEvent;
