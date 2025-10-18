const express = require("express");
const {PORT, MONGODB_URL, SESSION_CONFIG} = require("./config");
const path = require("node:path");
const mongoose = require("mongoose");
const session = require("express-session");
const fileupload = require("express-fileupload");

const server = express();


server.use(express.static(path.join(__dirname, "public")));
server.use('/upload', express.static(path.join(__dirname, 'upload')))


server.set("view engine", "ejs");


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(fileupload({
    useTempFiles: true
}));


server.use(session(SESSION_CONFIG));


mongoose.connect(MONGODB_URL)
    .then(() => console.log("MongoDb connected"))
    .catch((error) => console.log(error));


server.use(require("./routes"));

// Start servera
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
