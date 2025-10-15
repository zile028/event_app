const UserModel = require("../../models/UserModel");

const verify = async (req, res, next) => {
  try {
    
    const verifyUser = await UserModel.updateOne(
      { _id: req.params.code, active: false },
      { $set: { active: true } }
    );

    if (verifyUser.modifiedCount === 1) {
      
      return res.redirect("/auth/login");
    }

    
    const alreadyActive = await UserModel.findOne({
      _id: req.params.code,
      active: true,
    });

    if (alreadyActive) {
      return next(new Error("Vec ste se verifikovali"));
    }

   
    return next(new Error("Doslo je do greske, email nije verifikovan"));
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
