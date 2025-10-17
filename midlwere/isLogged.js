const isLogged = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.hasOwnProperty("user")) {
        next();
    } else {
        res.redirect("/auth/login");
    }
};
module.exports = isLogged;