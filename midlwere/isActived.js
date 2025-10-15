const UserModel = require("../models/UserModel")

const isActivated = async (req,res,next) => {
  const {firstName} = req.body;

  try {
    let user = await UserModel.findOne({firstName,active:true})
    
    if (user) {
        req.locals = user
        next()
    }else{
        next(new Error("user nije potvrdjen"))
    }
    
  } catch (error) {
    next(error)
    
  }
}
module.exports = isActivated