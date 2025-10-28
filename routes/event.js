/**
 * Event management routes
 * Handles event creation, listing, gallery, and deletion
 */

const express = require("express");
const router = express.Router();

/**
 * Event display routes
 */
router.get("/", require("../controllers/event/listEvents"));
router.get("/gallery", require("../controllers/event/galleryView"));

/**
 * Event creation routes
 */
router.get("/create", require("../controllers/event/createView"));
router.post("/create", require("../controllers/event/createEvent"));

/**
 * Event management actions
 */
router.post("/delete/:id", require("../controllers/event/delateEvent"));

module.exports = router;