var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");

const { register, login } = require("./controller");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), register);
router.post("/signin", login);

module.exports = router;
