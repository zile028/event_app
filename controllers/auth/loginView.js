const loginView = (req, res) => {
    res.render("auth/login", {errors: null});
};

module.exports = loginView;