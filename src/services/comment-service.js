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
    const placeholders = writingNo.map(() => '?').join(',');
    const params = writingNo;
    const sql = "SELECT seq_no, writing_no, mem_no, COUNT(*) AS cnt "
        + "FROM commentdb "
        + "WHERE writing_no IN (" + placeholders + ")"
        + "GROUP BY writing_no";
    // 'select writing_no, COUNT(*) AS cnt FROM commentdb where writing_no IN (?) group by writing_no'
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(sql, params)
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
        return rows
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.deleteComment = async (req) => {
    const seqNo = req.body.seqNo
    const memNo = req.body.memNo

    if(seqNo === undefined || seqNo === null || memNo === undefined || memNo === null){
        return '댓글 삭제 실패'
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Comment.deleteComment, [seqNo, memNo])
        return '댓글 삭제 성공'
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.deleteCommentWithWritingNo = async (req) => {
    const writingNo = req.body.writingNo

    if(writingNo === undefined || writingNo === null ){
        return '댓글 삭제 실패'
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Comment.deleteCommentWithWritingNo, [writingNo])
        return '댓글 삭제 성공'
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}