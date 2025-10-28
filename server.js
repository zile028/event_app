const express = require("express");
const { PORT, MONGODB_URL, SESSION_CONFIG } = require("./config");
const path = require("node:path");
const mongoose = require("mongoose");
const session = require("express-session");
const fileUpload = require("express-fileupload");

// Kreiranje Express aplikacije
const server = express();

// Static files middleware
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "public/uploads")));

// View engine setup
server.set("view engine", "ejs");

// Body parsing middleware
server.use(express.urlencoded({ extended: true }));

// Session middleware
server.use(session(SESSION_CONFIG));

// File upload middleware
server.use(fileUpload());

// Database connection
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("✅ MongoDB uspešno povezan"))
  .catch((error) =>
    console.log("❌ Greška pri povezivanju sa MongoDB:", error)
  );

// Routes middleware
server.use(require("./routes"));

// Server startup
server.listen(PORT, () => {
  console.log(`🚀 Server pokrenut na http://localhost:${PORT}`);
});
