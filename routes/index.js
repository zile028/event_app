const isLogged = require("../midlwere/isLogged");
const router = require("express").Router();

router.get("/", isLogged, (req, res) => {
    res.render("index", {user: req.session.user});
});
router.use("/auth", require("./auth"));
router.use("/event", require("./event"));

module.exports = router;