const CommentService = require('../services/comment-service')

exports.insertPost = async (req, res, next) => {
    try {
        let [rows, message] = await CommentService.insertComment(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        let [rows, message] = await CommentService.deleteComment(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}