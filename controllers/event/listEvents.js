const EventModel = require("../../models/EventModel");
const UserModel = require("../../models/UserModel");
const dayjs = require("dayjs");

const listEvents = async (req, res) => {
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
  const offset = (page - 1) * limit;
  try {
    const totalEvents = await EventModel.countDocuments();
    const totalPages = Math.ceil(totalEvents / limit);
    const events = await EventModel.aggregate([
      { $skip: offset },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      { $unwind: "$user" },
    ]);
    res.render("event/listView", {
      user: req.session.user,
      events: events,
      dayjs,
      page,
      totalPages,
      limit,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = listEvents;
