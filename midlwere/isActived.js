const UserModel = require("../models/UserModel");

const isActivated = async (req, res, next) => {
  const { email } = req.body;

  try {
    
    const user = await UserModel.findOne({ email, active: true });

    if (user) {
      req.locals = user; 
      next();
    } else {
      return res.render("auth/login", { errors: { email: "Email nije potvrđen" } });
    }

  } catch (error) {
    next(error);
  }
};

module.exports = isActivated;
