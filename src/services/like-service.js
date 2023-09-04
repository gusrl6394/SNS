const pool = require('../database/pool')
const Like = require('../queries/like-query')
const dayjs = require("dayjs")

exports.getlikesWithPost = async (req) => {
    const writingNo = req.body.writingNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Like.getlikesWithPost, [writingNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getlikesWithMemNo = async (req) => {
    const memNo = req.body.memNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Like.getlikesWithMemNo, [memNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getlikesWithPostAndMemNo = async (req) => {
    const writingNo = req.body.writingNo
    const memNo = req.body.memNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Like.getlikesWithPostAndMemNo, [writingNo, memNo])
        return [rows, fields]
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getlikesCountWithPost = async (req, writingNo) => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Like.getlikesCountWithPost, [writingNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getlikesCountWithPosts = async (req, writingNo) => {
    const memNo = req.body.memNo
    const placeholders = writingNo.map(() => '?').join(',');
    const params = writingNo;
    const sql = "SELECT writing_no, COUNT(*) AS cnt, MAX(mem_no="+memNo+") AS likeSt "
        + "FROM likedb "
        + "WHERE writing_no IN (" + placeholders + ")"
        + "GROUP BY writing_no";
    // 'select writing_no, COUNT(*) AS cnt FROM likedb where writing_no IN (?) group by writing_no'
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

exports.getlikesDataWithPosts = async (req, writingNo) => {
    const memNo = req.body.memNo
    const placeholders = writingNo.map(() => '?').join(',');
    const params = writingNo;
    const sql = "SELECT seq_no, writing_no, mem_no "
        + "FROM likedb "
        + "WHERE writing_no IN (" + placeholders + ") "
        + "AND mem_no = "+memNo;
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(sql, params, memNo)
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.insertLike = async (req) => {
    const writingNo = req.body.writingNo
    const memNo = req.body.memNo
    const likeNo = dayjs().format("YYYY-MM-DD HH:mm:ss")

    if(writingNo === undefined || writingNo === null || memNo === undefined || memNo === null){
        return [null, '좋아요 생성 실패']
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Like.insertLike, [writingNo, memNo, likeNo])
        return [rows, '좋아요 생성 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.deleteLike = async (req) => {
    const seqNo = req.body.seqNo

    if(seqNo === undefined || seqNo === null){
        return [null, '댓글 삭제 실패']
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(Like.deleteLike, [seqNo])
        return [rows, '댓글 삭제 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}