const EventModel = require("../../models/EventModel");

const likeEvent = async (req, res) => {
    try {
        const user = req.session.user;
        const {id} = req.params;

        const event = await EventModel.find({"_id": id, "likes.id": user._id});

        if (event.length === 0) {
            const updateEvent = await EventModel.updateOne(
                {"_id": id, "likes.id": {$not: {$eq: user._id}}}
                , {$push: {likes: {id: user._id, fullName: user.firstName}}});

        } else {
            const updateEvent = await EventModel.updateOne(
                {"_id": id, "likes.id": user._id}
                , {$pull: {likes: {id: user._id}}});
        }


        const previousPage = req.get("referer");
        return res.redirect(previousPage || "/event");
    } catch (err) {
        console.log(err);
        res.send("Greška pri lajkovanju");
    }
};

module.exports = likeEvent;
