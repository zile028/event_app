const express = require("express")
const {PORT} = require("./config");
const server = express()


server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})