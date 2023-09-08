const ClubService = require('../services/club-service')
const ClubMemberService = require('../services/clubMember-service')

exports.getClub = async (req, res, next) => {
    let { club_no } = req.params
    try {
        let rows = await ClubService.getClub(club_no)
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getClubs = async (req, res, next) => {
    try {
        let rows = await ClubService.getClubs()
        let clubJoinStatus = await ClubMemberService.getClubMemberWithMemNoAndExCl_ClubOut(req)
        return res.json({'data' : rows, 'clubJoinStatus' : clubJoinStatus})
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.insertClub = async (req, res, next) => {
    try {
        let [rows, message] = await ClubService.insertClub(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}