/**
 * List Events Controller
 * Handles displaying paginated list of events with user information
 */

const EventModel = require("../../models/EventModel");
const UserModel = require("../../models/UserModel");
const dayjs = require("dayjs");

/**
 * Display paginated list of events
 * Shows events with creator information and pagination controls
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const listEvents = async (req, res) => {
  // Parse pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  try {
    // Calculate pagination data
    const totalEvents = await EventModel.countDocuments();
    const totalPages = Math.ceil(totalEvents / limit);

    // Fetch events with user information using aggregation
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
      // Handle missing users gracefully with default values
      {
        $addFields: {
          user: {
            $cond: {
              if: { $eq: [{ $size: "$user" }, 0] },
              then: {
                _id: null,
                firstName: "Nepoznato",
                lastName: "",
                avatar: "uploads/user_avatar.png",
              },
              else: { $arrayElemAt: ["$user", 0] },
            },
          },
        },
      },
    ]);

    // Render events list page
    res.render("event/listView", {
      user: req.session.user,
      events: events,
      dayjs,
      page,
      totalPages,
      limit,
    });

  } catch (error) {
    console.error("Greška pri dohvatanju događaja:", error);
    res.status(500).send(error.message);
  }
};

module.exports = listEvents;
