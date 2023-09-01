const LikeService = require('../services/like-service')

exports.insertLike = async (req, res, next) => {
    try {
        let [result, field] = await LikeService.getlikesWithPostAndMemNo(req)
        if(result.length > 0){
            return res.json('이미 좋아요 눌렀습니다. 새로고침 필요')
        }
        let [rows, message] = await LikeService.insertLike(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.deleteLike = async (req, res, next) => {
    try {
        let [rows, message] = await LikeService.deleteLike(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}