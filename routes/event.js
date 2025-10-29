const {Router} = require("express");
const router = Router();

router.get("/create", require("../controllers/event/createView"));
router.post("/create", require("../controllers/event/createEvent"));
router.post("/delete/:id", require("../controllers/event/delateEvent"));
router.post("/like/:id", require("../controllers/event/likeEvent"));

router.get("/", require("../controllers/event/listEvents"));
router.get("/gallery", require("../controllers/event/galleryView"));
router.get("/:id", require("../controllers/event/singleEventView"));


module.exports = router;