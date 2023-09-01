const ClubMemberService = require('../services/clubMember-service')

exports.getClubMemberWithClubNo = async (req, res, next) => {
    // let { club_no } = req.params
    try {
        let rows = await ClubMemberService.getClubMemberWithClubNo(req)
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getClubMemberPendingApprove = async (req, res, next) => {
    // let { club_no } = req.params
    try {
        let rows = await ClubMemberService.getClubMemberPendingApprove(req)
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getClubMemberWithClubJoinMember = async (req, res, next) => {
    // let { club_no } = req.params
    try {
        let rows = await ClubMemberService.getClubMemberWithClubJoinMember(req)
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.insertClubMember = async (req, res, next) => {
    try {
        let [rows, message] = await ClubMemberService.insertClubMember(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.updateClubMemberWithJoinPer = async (req, res, next) => {
    try {
        let [rows, message] = await ClubMemberService.updateClubMemberWithJoinPer(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.updateClubMemberWithClubOut = async (req, res, next) => {
    try {
        let [rows, message] = await ClubMemberService.updateClubMemberWithJoinPer(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}