var express = require("express");
var router = express.Router();
const { index, login, logout } = require("./controller");

router.get("/", index);
router.post("/", login);
router.get("/logout", logout);
module.exports = router;
