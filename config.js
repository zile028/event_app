/**
 * Application Configuration
 * Central configuration file for environment variables and settings
 */

const path = require("node:path");

// Email configuration constants
const MAIL_USER = "petafipedjaradic@gmail.com";
const MAIL_PASSWORD = "hempduvilcdkoafd ";

// Server configuration
const PORT = 3000;

/**
 * Email service configuration
 * Gmail SMTP settings for sending verification emails
 */
const MAIL_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
};

/**
 * Session configuration
 * Express session settings for user authentication
 */
const SESSION_CONFIG = {
  name: "event-app",
  resave: false,
  secret: "b8646bd4ed7273de1ccb",
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
};

/**
 * Application configuration exports
 * All configuration constants and objects used throughout the application
 */
module.exports = {
  PORT,
  MONGODB_URL:
    "mongodb+srv://zile028_db_user:4qdHqSEqvIaQjsXX@cluster0.s9prhfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  AVATAR_IMG: "user_avatar.png",
  MAIL_CONFIG,
  MAIL_USER,
  SERVER_URL: `http://localhost:${PORT}`,
  SESSION_CONFIG,
  UPLOAD_DIR: path.join(__dirname, "public/uploads/"),
};
