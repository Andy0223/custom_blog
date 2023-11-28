// routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 新增文章
router.post('/', postController.createPost);

// 取得所有文章
router.get('/', postController.getAllPosts);

// 取得單一文章
router.get('/', postController.searchPostsByTitle);

// 更新文章
router.put('/:id', postController.updatePost);

// 刪除文章
router.delete('/:id', postController.deletePost);

module.exports = router;
