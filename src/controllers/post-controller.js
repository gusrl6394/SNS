const PostService = require('../services/post-service')
const CommentService = require('../services/comment-service')
const LikeService = require('../services/like-service')

exports.getPost = async (req, res, next) => {
    let { writing_no } = req.params
    try {
        let post = await PostService.getPost(writing_no)
        let comment = await CommentService.getCommentsCountForPost(req, writing_no)
        let like = await LikeService.getlikesCntWithPost(req, writing_no)
        return res.json({'post': post, 'commentCnt' : comment, 'likeCnt' : like})
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        let rows = await PostService.getPosts()
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getPostsWithClubNo = async (req, res, next) => {
    try {
        let rows = await PostService.getPostsWithClubNo(req)
        let writingNoArr = []
        for(var i=0; i<rows.length; i++){
            writingNoArr.push(rows[i].writing_no)
        }
        let commentCntArr = await CommentService.getCommentsCountForPosts(writingNoArr)
        let likeCntArr = []
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.insertPost = async (req, res, next) => {
    try {
        let [rows, message] = await PostService.insertPost(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}