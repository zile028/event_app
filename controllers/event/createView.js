const createView = (req, res) => {
    res.render("event/createView", {user: req.session.user});
};
module.exports = createView;