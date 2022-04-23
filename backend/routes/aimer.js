const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controlers/aimer");

router.post("/", auth, aimerCtrl.createAimer);
router.get("/:id", auth, aimertrl.getAimerOfPost);


module.exports = router;