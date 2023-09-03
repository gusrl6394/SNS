const pool = require('../database/pool')
const PostQuery = require('../queries/posts-query')
const dayjs = require("dayjs")
const ClubQuery = require("../queries/club-query");

exports.getPost = async (writing_no) => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(PostQuery.getPost, [writing_no])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getPosts = async () => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(PostQuery.getPosts)
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getPostsWithClubNo = async (req) => {
    const clubNo = JSON.parse(req.body.some_data).clubNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(PostQuery.getPostsWithClubNo, [clubNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.insertPost = async (req) => {
    const memNo = req.body.memNo
    const clubNo = req.body.clubNo
    const postCode = req.body.postCode === undefined ? null : req.body.postCode
    const postsTitle = req.body.postsTitle
    const postsContent = req.body.postsContent
    const postsDate = dayjs().format("YYYY-MM-DD HH:mm:ss")

    if(memNo === undefined || memNo === null || clubNo === undefined || clubNo === null ||
        postsTitle === undefined || postsTitle === null || postsContent === undefined){
        return [null, '글 생성 실패']
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        // 'insert into posts(mem_no, club_no, post_code, posts_title, posts_content, posts_date) values(?,?,?,?,?,?)'
        let [rows, fields] = await conn.execute(PostQuery.insertPost, [memNo, clubNo, postCode, postsTitle, postsContent, postsDate])
        return [rows, '글 생성 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}