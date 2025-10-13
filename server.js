const express = require("express");
const {PORT, MONGODB_URL} = require("./config");
const path = require("node:path");
const mongoose = require("mongoose");
const server = express();

server.use(express.static(path.join(__dirname, "public")));
server.set("view engine", "ejs");
server.use(express.urlencoded({extended: true}));
    
mongoose.connect(MONGODB_URL)
    .then(() => console.log("MongoDb connected"))
    .catch((error) => console.log(error));

server.use(require("./routes"));

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});