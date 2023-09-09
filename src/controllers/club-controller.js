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
        if(rows !== null){
            var clubNoArgumnet = rows.insertId
            let [data1, filed1] = await ClubMemberService.insertClubMember(req, clubNoArgumnet)
            var joinNoArgumnet = data1.insertId
            let [data2, filed2] = await ClubMemberService.updateClubMemberWithJoinPer(req, joinNoArgumnet)
            return res.json('동아리 생성 성공')
        } else {
            return res.json('동아리 생성 실패')
        }
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}