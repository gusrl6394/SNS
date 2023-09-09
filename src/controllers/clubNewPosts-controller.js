const ClubNewPosts = require('../services/clubNewPosts-service')
const ClubMemberService = require('../services/clubMember-service')


exports.postsWithComment = async (req, res, next) => {
    try {
        let [data, field1] = await ClubMemberService.getClubMemberWithMemNo(req)
        var clubNoArr = []
        if(data.length > 0){
            data.map(function (element) {
                if(element.joinper_date !== null && element.clubout_date === null){
                    clubNoArr.push(element.club_no)
                }
            })
        }
        
        if(clubNoArr.length > 0){
            let [rows, field2] = await ClubNewPosts.postsWithComment(clubNoArr)
            return res.json(rows)
        } else {
            return res.json('데이터 없음')
        }
    } catch (e) {
        return res.status(500).json(e)
    }
}