const express = require("express");
const router = express.Router();
const auth = require("../midleware/auth");
const aimerCtrl = require("../controllers/aimer");

router.post("/", auth, aimerCtrl.aimer);
router.get("/:postId", auth, aimerCtrl.getAimerByPostId);
router.delete("/:postId", auth, aimerCtrl.deleteAimer);

module.exports = router;