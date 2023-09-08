const express = require('express')
const router = express.Router()
const ClubController = require('../controllers/club-controller')

router.post('/', ClubController.getClubs)
router.get('/:club_no', ClubController.getClub)
router.post('/create', ClubController.insertClub)

module.exports = router