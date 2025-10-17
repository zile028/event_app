const {Router} = require("express");
const router = Router();

router.get("/create", require("../controllers/event/createView"));

module.exports = router;