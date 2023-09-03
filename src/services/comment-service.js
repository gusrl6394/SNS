const pool = require('../database/pool')
const Comment = require('../queries/comment-query')
const dayjs = require("dayjs")

exports.getCommentsForPost = async (req) => {
    const writingNo = req.body.writingNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        // 'select * from comment where writing_no = ?'
        let [rows, fields] = await conn.execute(Comment.getCommentsForPost, [writingNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getCommentsCountForPost = async (req, writingNo) => {
    if(writingNo === undefined || writingNo === null){
        if(req.body.writingNo === undefined || req.body.writingNo === null){
            return 0
        }
        writingNo = req.body.writingNo
    }
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Comment.getCommentsCountForPost, [writingNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getCommentsCountForPosts = async (writingNo) => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Comment.getCommentsCountForPosts, writingNo)
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.insertComment = async (req) => {
    const writingNo = req.body.writingNo
    const memNo = req.body.memNo
    const comment = req.body.comment
    const commentDate = dayjs().format("YYYY-MM-DD HH:mm:ss")

    if(writingNo === undefined || writingNo === null || memNo === undefined || memNo === null
        || comment === undefined || comment === null){
        return [null, '댓글 생성 실패']
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        // 'insert into comment(writing_no, mem_no, comment, comment_date) values(?,?,?,?)'
        let [rows, fields] = await conn.execute(Comment.insertComment, [writingNo, memNo, comment, commentDate])
        return [rows, '댓글 생성 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.deleteComment = async (req) => {
    const writingNo = req.body.writingNo
    const memNo = req.body.memNo

    if(writingNo === undefined || writingNo === null || memNo === undefined || memNo === null){
        return [null, '댓글 삭제 실패']
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Comment.deleteComment, [writingNo, memNo])
        return [rows, '댓글 삭제 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}