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

/* GET home page. */
const { isAdmin } = require("../middleware/auth");
router.use(isAdmin);
router.get("/", index);
router.get("/create", create);
router.post("/store", store);
router.get("/:id/edit", edit);
router.put("/:id", update);
router.delete("/:id", destroy);
router.put("/status/:id", actionStatus);

module.exports = router;
