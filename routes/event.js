const {Router} = require("express");
const router = Router();

router.get("/create", require("../controllers/event/createView"));
router.post("/create", require("../controllers/event/createEvent"));
router.post("/delete/:id", require("../controllers/event/delateEvent"));

router.get("/", require("../controllers/event/listEvents"));
router.get("/gallery", require("../controllers/event/galleryView"));

module.exports = router;