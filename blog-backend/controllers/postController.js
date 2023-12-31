// controllers/postController.js

const db = require('../db')
// 新增文章
exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, results) => {
        if (err) {
        res.status(500).send(err);
        } else {
        res.status(201).send('Post created successfully');
        }
    });
};

// 取得所有文章
exports.getAllPosts = async (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) {
        res.status(500).send(err);
        } else {
        res.json(results);
        }
    });
};

// Search posts by title
exports.searchPostsByTitle = async (req, res) => {
    const title = req.query.title;
    let query = 'SELECT * FROM posts WHERE title LIKE ?';
    let params = [`%${title}%`];

    db.query(query, params, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

// 取得單一文章
exports.getPostById = async (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: '文章不存在。' });
    }
};

// 更新文章
exports.updatePost = async (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId], (err, results) => {
        if (err) {
        res.status(500).send(err);
        } else {
        res.status(200).send('Post updated successfully');
        }
    });
};

// 刪除文章
exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
        if (err) {
        res.status(500).send(err);
        } else {
        res.status(200).send('Post deleted successfully');
        }
    });
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
};
