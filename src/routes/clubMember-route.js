const express = require('express')
const router = express.Router()
const ClubMemberController = require('../controllers/clubMember-controller')

router.get('/', ClubMemberController.getClubMemberWithClubNo)
router.post('/pendigApprove', ClubMemberController.getClubMemberPendingApprove)
router.post('/clubJoinMember', ClubMemberController.getClubMemberWithClubJoinMember)
router.post('/create', ClubMemberController.insertClubMember)
router.patch('/approve', ClubMemberController.updateClubMemberWithJoinPer)
router.patch('/reject', ClubMemberController.updateClubMemberWithClubOut)

module.exports = router