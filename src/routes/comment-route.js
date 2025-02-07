const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/comment-controller')

router.post('/load', CommentController.getCommentsForPost)
router.post('/create', CommentController.insertPost)
router.delete('/delete', CommentController.deleteComment)

module.exports = router