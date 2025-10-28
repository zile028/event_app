/**
 * Main router configuration
 * Handles all application routes and middleware setup
 */

const express = require("express");
const isLogged = require("../midlwere/isLogged");

const router = express.Router();

/**
 * Home page route
 * Renders the main dashboard for authenticated users
 */
router.get("/", isLogged, (req, res) => {
  res.render("index", { 
    user: req.session.user 
  });
});

/**
 * Route modules
 * Authentication routes - publicly accessible
 */
router.use("/auth", require("./auth"));

/**
 * Protected routes - require authentication
 */
router.use("/event", isLogged, require("./event"));
router.use("/user", isLogged, require("./user"));

module.exports = router;
