const express = require('express')
const router = express.Router()
const LikeController = require('../controllers/like-controller')

router.post('/create', LikeController.insertLike)
router.delete('/delete', LikeController.deleteLike)

module.exports = router