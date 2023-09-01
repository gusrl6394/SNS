const express = require('express')
const router = express.Router()
const ClubMemberController = require('../controllers/clubMember-controller')

router.get('/', ClubMemberController.getClubMemberWithClubNo)
router.get('/pendigApprove', ClubMemberController.getClubMemberPendingApprove)
router.get('/clubJoinMember', ClubMemberController.getClubMemberWithClubJoinMember)
router.post('/create', ClubMemberController.insertClubMember)
router.patch('/joinPer', ClubMemberController.updateClubMemberWithJoinPer)
router.delete('/clubOut', ClubMemberController.updateClubMemberWithClubOut)

module.exports = router