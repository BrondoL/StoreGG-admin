var express = require("express");
var router = express.Router();
const { index, login } = require("./controller");

router.get("/", index);
router.post("/", login);
module.exports = router;
