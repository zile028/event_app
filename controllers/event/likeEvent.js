const EventModel = require("../../models/EventModel");

const likeEvent = async (req, res) => {
    try {
        const user = req.session.user; 
        const { id } = req.params;     
        const error = {}

        if (!user) {
            return res.redirect("/auth/login");
        }

        const event = await EventModel.findById(id);
        if (!event){
            error.message = "Event ne postoji";
        } 

        // ako si vec lajovao
        const liked = event.likes.find((like) => like.id.toString() === user._id.toString());

        if (liked) {
            // uklanjanje lajka
            event.likes = event.likes.filter((like) => like.id.toString() !== user._id.toString());
        } else {
            event.likes.push({ id: user._id, fullName: user.firstName  });
        }

        await event.save();
             
        const previousPage = req.get("referer");
        return res.redirect(previousPage || "/event");
    } catch (err) {
        console.log(err);
        res.send("Greška pri lajkovanju");
    }
};

module.exports = likeEvent;
