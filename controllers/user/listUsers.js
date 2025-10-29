const UserModel = require("../../models/UserModel");

const listUsers = async (req, res) => {
  try {
   
    const users = await UserModel.find();

    res.render("user/listUsers", {
      users,
      user: req.session.user, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Greška pri učitavanju korisnika");
  }
};

module.exports = listUsers;
