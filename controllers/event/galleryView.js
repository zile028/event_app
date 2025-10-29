const EventModel = require("../../models/EventModel");
const dayjs = require("dayjs");
const UserModel = require("../../models/UserModel");

const galleryView = async (req, res) => {
    let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;

    let offset = (page - 1) * limit;
    try {
        const events = await EventModel.aggregate([
                {$skip: offset},
                {$limit: limit},
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
                                    avatar: 1
                                }
                            },
                            {$unwind: "$user"}

                        ]
                    }
                },
                {
                    $addFields: {
                        likes: {
                            $map: {
                                input: "$likes",
                                as: "like",
                                in: {$toString: "$$like.id"}
                            }
                        }
                    }
                }


            ]
        );

        // Izračunaj ukupan broj događaja za paginaciju
        const totalEvents = await EventModel.countDocuments();
        const totalPages = Math.ceil(totalEvents / limit);


        res.render("event/galleryView", {
            user: req.session.user,
            events: events,
            dayjs,
            page,
            limit,
            totalPages

        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = galleryView;