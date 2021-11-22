var express = require("express");
var router = express.Router();
const { index, create, store } = require("./controller");
const multer = require("multer");
const os = require("os");

/* GET home page. */
router.get("/", index);
router.get("/create", create);
router.post("/store", multer({ dest: os.tmpdir() }).single("image"), store);
// router.get("/:id/edit", edit);
// router.put("/:id", update);
// router.delete("/:id", destroy);

module.exports = router;
