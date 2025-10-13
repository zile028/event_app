const router = require("express").Router();

router.get("/register", require("../controllers/auth/registerViewCtrl"));
router.get("/login", require("../controllers/auth/loginView"));
router.post("/register", require("../controllers/auth/createUser"));
router.get("/verify/:code",require("../controllers/auth/verify"))

module.exports = router;