const UserModel = require("../../models/UserModel")

const verify = async(req,res,next) => {
  try {
     let verifyUser = await UserModel.updateOne({_id:req.params.code},{$set:{active:true}});
     if (verifyUser.modifiedCount ===1) {
          res.redirect("/auth/login");
        
     }else if(verifyUser.modifiedCount ===1 && verifyUser.matchedCount ===1){
         next(new Error("vec ste se verifikovali"))

    }else{
        
        next(new Error("DOSLO JE DO GRESKE eMAIL NIJE VERIFIKOVAN"))
     }
  } catch (error){
    next(error)
  }
}

module.exports = verify