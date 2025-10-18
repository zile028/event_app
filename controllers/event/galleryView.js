const EventModel = require("../../models/EventModel");
const dayjs = require("dayjs");

const galleryView = async(req, res) => {
    try {
        const event = await EventModel.find();
        
        
        res.render("event/galleryView", {user:req.session.user,event,dayjs});

    } catch (error) {
        res.status(500).send(error.message);
    }
    
    
};

module.exports = galleryView;