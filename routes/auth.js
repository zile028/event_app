const isActivated = require("../midlwere/isActived");

const router = require("express").Router();

router.get("/register", require("../controllers/auth/registerViewCtrl"));
router.get("/login", require("../controllers/auth/loginView"));
router.get("/verify/:code",require("../controllers/auth/verify"))

router.post("/register", require("../controllers/auth/createUser"));
router.post("/loginUser",isActivated, require("../controllers/auth/loginUser"));

module.exports = router;