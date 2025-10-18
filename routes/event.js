const {Router} = require("express");
const router = Router();

router.get("/create", require("../controllers/event/createView"));
router.get("/gallery", require("../controllers/event/galleryView"));


router.post("/createEvent",require("../controllers/event/createEvent"));

module.exports = router;