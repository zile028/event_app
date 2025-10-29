const isLogged = require("../midlwere/isLogged");
const router = require("express").Router();

router.get("/", isLogged, (req, res) => {
    res.render("index", {user: req.session.user});
});

router.use("/auth", require("./auth"));
router.use("/event", isLogged, require("./event"));
router.use("/user", require("./user"));

module.exports = router;