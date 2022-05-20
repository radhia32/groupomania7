const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require('../midleware/auth');

router.get("/:id/allcomments", auth, commentCtrl.getCommentsByPostId);
router.post("/", auth, commentCtrl.addComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
