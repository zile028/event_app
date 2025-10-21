const EventModel = require("../../models/EventModel");

const deleteEvent = async (req, res) => {
    try {
        const user = req.session.user;
        
        if (!user) {
            return res.status(401).send("Moraš biti ulogovan da bi obrisao event.");
        }

        const { id } = req.params;
        const event = await EventModel.findById(id);

        if (!event) {
            return res.status(404).send("Event ne postoji");
        }

        
        const isOwner = event.user.toString() === user._id.toString();
        const isAdmin = user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).send("Nemaš dozvolu da obrišeš ovaj event.");
        }

        await EventModel.deleteOne({ _id: id });

        const previousPage = req.get("referer");
        return res.redirect(previousPage || "/event");

    } catch (error) {
        console.log(error);
        res.status(500).send("Greška pri brisanju eventa.");
    }
};

module.exports = deleteEvent;
