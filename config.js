const path = require("node:path");
const MAIL_PASSWORD = "hempduvilcdkoafd ";
const MAIL_USER = "petafipedjaradic@gmail.com";
const PORT = 3000;
const MAIL_CONFOG = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
};
const SESSION_CONFIG = {
    name: "event-app",
    resave: false,
    secret: "b8646bd4ed7273de1ccb",
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
};

module.exports = {
    PORT,
    MONGODB_URL:
        "mongodb+srv://zile028_db_user:4qdHqSEqvIaQjsXX@cluster0.s9prhfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    AVATAR_IMG: "user_avatar.png",
    MAIL_CONFOG,
    MAIL_USER,
    SERVER_URL: `http://localhost:${PORT}`,
    SESSION_CONFIG,
    UPLOAD_DIR: path.join(__dirname, "public/uploads/")
};
