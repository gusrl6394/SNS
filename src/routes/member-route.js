const express = require('express')
const router = express.Router()
const MemberController = require('../controllers/member-controller')

router.get('/', MemberController.getMembers)
router.get('/:member_no', MemberController.getMember)
router.post('/sign', MemberController.insertMember)
router.post('/login', MemberController.getMemberWithIdAndPW)


module.exports = router