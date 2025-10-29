const EventModel = require("../../models/EventModel");
const mongoose = require("mongoose");
const dayjs = require("dayjs");

const singleEventView = async (req, res) => {
  const { id } = req.params;
  const errors = {};

  try {
   
    const result = await EventModel.aggregate([
      {
        $lookup: {
          from: "users",             
          localField: "user",       
          foreignField: "_id",       
          as: "userData",            
        },
      },
      { $unwind: "$userData" }, 
    ]);

    

    const event = result[0];

    res.render("event/singleView", {
      event,
      user: req.session.user,
      dayjs,
    });
  } catch (err) {
    console.error(err);
    errors.server = "Greška na serveru";
    res.render("error", { errors });
  }
};

module.exports = singleEventView;
