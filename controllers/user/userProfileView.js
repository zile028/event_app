/**
 * User Profile View Controller
 * Handles displaying user profile information and user events
 */

const UserModel = require("../../models/UserModel");
const EventModel = require("../../models/EventModel");
const dayjs = require("dayjs");

/**
 * Display user profile page
 * Shows user information, statistics, and created events
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const userProfileView = async (req, res) => {
  try {
    const userId = req.session.user._id;

    // Fetch complete user data from database
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).render("error", {
        message: "Korisnik nije pronađen",
        user: req.session.user,
      });
    }

    // Fetch user's created events (latest 10)
    const userEvents = await EventModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10);

    // Count total events created by user
    const totalUserEvents = await EventModel.countDocuments({ user: userId });

    // Check for success message from edit page
    const success = req.query.success === "true";

    // Render profile page with user data and events
    res.render("user/profile", {
      user: user,
      sessionUser: req.session.user,
      title: "Moj profil",
      success: success,
      userEvents: userEvents,
      totalUserEvents: totalUserEvents,
      dayjs: dayjs,
    });

  } catch (error) {
    console.error("Greška pri učitavanju korisničkog profila:", error);
    res.status(500).render("error", {
      message: "Došlo je do greške pri učitavanju profila",
      user: req.session.user,
    });
  }
};

module.exports = {
  userProfileView,
};
