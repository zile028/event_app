const createUser = async (req, res) => {
    console.log(req.body);
    res.redirect("/auth/register");
};

module.exports = createUser;