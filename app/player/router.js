var express = require("express");
var router = express.Router();
const { isPlayer } = require("../middleware/auth");

const {
    landingPage,
    detailPage,
    categories,
    checkout,
} = require("./controller");

router.get("/landing-page", landingPage);
router.get("/:id/detail", detailPage);
router.get("/categories", categories);
router.post("/checkout", isPlayer, checkout);

module.exports = router;
