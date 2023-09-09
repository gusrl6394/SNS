const ClubMemberService = require('../services/clubMember-service')
const MemberService = require("../services/member-service");

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
        if(rows.length > 0){
            let memNoArr = []
            for(var i=0; i<rows.length; i++){
                memNoArr.push(rows[i].mem_no)
            }
            let membersArr = await MemberService.getMembersWithArr(req, memNoArr)
            return res.json({'rows':rows, 'membersArr':membersArr})
        } else {
            return res.json({'rows': [], 'membersArr': []})
        }
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
        let [rows, message] = await ClubMemberService.insertClubMember(req, {})
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.updateClubMemberWithJoinPer = async (req, res, next) => {
    try {
        let [rows, message] = await ClubMemberService.updateClubMemberWithJoinPer(req, {})
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.updateClubMemberWithClubOut = async (req, res, next) => {
    try {
        let message = await ClubMemberService.updateClubMemberWithClubOut(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}