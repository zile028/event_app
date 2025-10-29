/**
 * Authentication routes
 * Handles user registration, login, verification, and logout
 */

const express = require("express");
const isActivated = require("../midlwere/isActived");

const router = express.Router();

/**
 * GET routes - Authentication pages
 */
router.get("/register", require("../controllers/auth/registerViewCtrl"));
router.get("/login", require("../controllers/auth/loginView"));
router.get("/logout", require("../controllers/auth/logout"));

/**
 * Email verification routes
 */
router.get("/verify", require("../controllers/auth/verify"));
router.get("/verify/:code", require("../controllers/auth/verify"));

/**
 * POST routes - Authentication actions
 */
router.post("/register", require("../controllers/auth/createUser"));
router.post("/loginUser", isActivated, require("../controllers/auth/loginUser"));

module.exports = router;