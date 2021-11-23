var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middleware/auth");
const { index } = require("./controller");

/* GET home page. */
router.use(isAdmin);
router.get("/", index);

module.exports = router;
