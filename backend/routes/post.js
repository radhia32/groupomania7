const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../midleware/auth');
const multer = require('../midleware/multer-config');

//Routage

router.post("/", auth, multer,postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
//router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);
//router.put("/:id", auth, postCtrl.modifyPost);


module.exports = router; 