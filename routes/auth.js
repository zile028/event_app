const router = require("express").Router();

router.get("/register", require("../controllers/auth/registerViewCtrl"));
router.post("/register", require("../controllers/auth/createUser"));

module.exports = router;