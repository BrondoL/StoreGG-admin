var express = require("express");
var router = express.Router();
const { index, actionStatus } = require("./controller");

const { isAdmin } = require("../middleware/auth");
router.use(isAdmin);
router.get("/", index);
router.put("/status/:id", actionStatus);

module.exports = router;
