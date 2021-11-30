var express = require("express");
var router = express.Router();
const { isPlayer } = require("../middleware/auth");
const multer = require("multer");
const os = require("os");

const {
    landingPage,
    detailPage,
    categories,
    checkout,
    history,
    historyDetail,
    dashboard,
    profile,
    editProfile,
} = require("./controller");

router.get("/landing-page", landingPage);
router.get("/:id/detail", detailPage);
router.get("/categories", categories);
router.post("/checkout", isPlayer, checkout);
router.get("/histories", isPlayer, history);
router.get("/histories/:id", isPlayer, historyDetail);
router.get("/dashboard", isPlayer, dashboard);
router.get("/profile", isPlayer, profile);
router.put(
    "/profile",
    isPlayer,
    multer({ dest: os.tmpdir() }).single("image"),
    editProfile
);

module.exports = router;
