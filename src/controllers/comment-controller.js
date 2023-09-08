const CommentService = require('../services/comment-service')
const MemberService = require('../services/member-service')

exports.getCommentsForPost = async (req, res) => {
    try {
        let rows = await CommentService.getCommentsForPost(req)
        if(rows.length > 0){
            let memNoSet = new Set()
            for(var i=0; i<rows.length; i++){
                memNoSet.add(rows[i].mem_no)
            }
            let memNoArr = [...memNoSet]
            let memberArr = await MemberService.getMembersWithArr(req, memNoArr)
            return res.json({'comment' : rows, 'memberArr' : memberArr})
        } else {
            return res.json({'comment' : [], 'memberArr' : []})
        }
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.insertPost = async (req, res) => {
    try {
        let rows = await CommentService.insertComment(req)
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.deleteComment = async (req, res) => {
    try {
        let message = await CommentService.deleteComment(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}