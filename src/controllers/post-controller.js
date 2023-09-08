const PostService = require('../services/post-service')
const CommentService = require('../services/comment-service')
const LikeService = require('../services/like-service')
const MemberService = require('../services/member-service')

exports.getPost = async (req, res, next) => {
    let { writing_no } = req.params
    try {
        let post = await PostService.getPost(writing_no)
        let comment = await CommentService.getCommentsCountForPost(req, writing_no)
        let like = await LikeService.getlikesCountWithPost(req, writing_no)
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
        if(rows.length > 0){
            let writingNoArr = []
            let memNoArr = []
            for(var i=0; i<rows.length; i++){
                writingNoArr.push(rows[i].writing_no)
                memNoArr.push(rows[i].mem_no)
            }
            let membersArr = await MemberService.getMembersWithArr(req, memNoArr)
            let commentCntArr = await CommentService.getCommentsCountForPosts(writingNoArr)
            let likeCntArr = await LikeService.getlikesCountWithPosts(req, writingNoArr)
            let likeCntArr_WritingNo = []
            for(var i=0; i<likeCntArr.length; i++){
                if(likeCntArr[i].likeSt === 1){
                    likeCntArr_WritingNo.push(likeCntArr[i].writing_no)
                }
            }
            let likeDataArr = []
            if(likeCntArr_WritingNo.length > 0){
                likeDataArr = await LikeService.getlikesDataWithPosts(req, likeCntArr_WritingNo)
            }
            return res.json({'post' : rows, 'commentCnt' : commentCntArr, 'likeCnt' : likeCntArr, 'likeDataArr' : likeDataArr, 'membersArr' : membersArr})
        } else {
            return res.json({'post' : [], 'commentCnt' : [], 'likeCnt' : [], 'likeDataArr' : [], 'membersArr' : []})
        }
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.insertPost = async (req, res, next) => {
    try {
        let message = await PostService.insertPost(req)
        return res.json({"msg":message})
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        let message = await PostService.deletePost(req)
        if(message === '글 삭제 성공'){
            await CommentService.deleteCommentWithWritingNo(req)
            await LikeService.deleteLikeWithWritingNo(req)
        }
        return res.json({"msg":message})
    } catch (e) {
        return res.status(500).json(e)
    }
}