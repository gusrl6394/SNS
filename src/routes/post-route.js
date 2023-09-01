const express = require('express')
const router = express.Router()
const PostController = require('../controllers/post-controller')

router.get('/', PostController.getPosts)
router.get('/:writing_no', PostController.getPost)
router.post('/create', PostController.insertPost)

module.exports = router