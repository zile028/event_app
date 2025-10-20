const EventModel = require("../../models/EventModel");
const dayjs = require("dayjs");
const UserModel = require("../../models/UserModel");

const galleryView = async (req, res) => {
    try {
        
        const events = await EventModel.find();
        const users = await UserModel.find();
          const userMap = {};
    users.forEach(u => {
      userMap[u._id.toString()] = u;
    });

        res.render("event/galleryView", { user: req.session.user,users,userMap, event: events, dayjs });

    } catch (error) {
        res.status(500).send(error.message);
    }


};

module.exports = galleryView;