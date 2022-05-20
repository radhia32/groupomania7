const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../midleware/auth');
const multer = require('../midleware/multer-config');

router.post("/", auth, multer,postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.delete("/:id", auth, postCtrl.deletePost);



module.exports = router; 