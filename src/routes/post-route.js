const express = require('express')
const router = express.Router()
const PostController = require('../controllers/post-controller')

router.get('/', PostController.getPosts)
router.post('/club', PostController.getPostsWithClubNo)
router.post('/create', PostController.insertPost)
router.delete('/delete', PostController.deletePost)

module.exports = router