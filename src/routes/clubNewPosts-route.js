const express = require('express')
const router = express.Router()
const ClubNewPostsController = require('../controllers/clubNewPosts-controller')

router.post('/postsWithComment', ClubNewPostsController.postsWithComment)

module.exports = router