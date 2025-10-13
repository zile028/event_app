const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index");
});
router.use("/auth", require("./auth"));

module.exports = router;