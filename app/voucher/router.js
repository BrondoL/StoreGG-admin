var express = require("express");
var router = express.Router();
const {
    index,
    create,
    store,
    edit,
    update,
    destroy,
    actionStatus,
} = require("./controller");
const multer = require("multer");
const os = require("os");

/* GET home page. */
const { isAdmin } = require("../middleware/auth");
router.use(isAdmin);
router.get("/", index);
router.get("/create", create);
router.post("/store", multer({ dest: os.tmpdir() }).single("image"), store);
router.get("/:id/edit", edit);
router.put("/:id", multer({ dest: os.tmpdir() }).single("image"), update);
router.delete("/:id", destroy);
router.put("/status/:id", actionStatus);

module.exports = router;
