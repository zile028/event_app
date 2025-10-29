const {Router} = require("express");
const router = Router();

router.get("/", require("../controllers/user/listUsers"));


module.exports = router;