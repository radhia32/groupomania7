const express = require("express");
const router = express.Router();
const auth = require("../midleware/auth");
const dislikeCtrl = require("../controllers/dislike");

router.post("/", auth, dislikeCtrl.dislike);
router.get("/:postId", auth, dislikeCtrl.getDislikeByPostId);
router.delete("/:postId", auth, dislikeCtrl.deleteDislike);

module.exports = router;