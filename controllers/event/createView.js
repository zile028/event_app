const UserModel = require("../../models/UserModel");

const createView = async(req, res) => {
    try {
        const users = await UserModel.find();
        res.render("event/createView", {user: req.session.user,
             users:users,
             
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
    
};
module.exports = createView;