/**
 * User profile routes
 * Handles user profile viewing and editing functionality
 */

const express = require("express");
const {userProfileView} = require("../controllers/user/userProfileView");
const {
    userEditView,
    userEditPost
} = require("../controllers/user/userEditController");

const router = express.Router();
router.get("/", require("../controllers/user/listUsers"));
/**
 * User profile display route
 * Shows user profile information and events
 */
router.get("/profile", userProfileView);

/**
 * User profile editing routes
 * GET - Display edit form
 * POST - Process profile updates and avatar uploads
 */
router.get("/edit", userEditView);
router.post("/edit", userEditPost);

module.exports = router;