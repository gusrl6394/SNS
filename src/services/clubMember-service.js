const pool = require('../database/pool')
const ClubMember = require('../queries/clubMember-query')
const dayjs = require("dayjs")

exports.getClubMemberWithClubNo = async (req) => {
    const clubNo = req.body.clubNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubMember.getClubMemberWithClubNo, [clubNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getClubMemberWithMemNoAndExCl_ClubOut = async (req) => {
    const memNo = req.body.memNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubMember.getClubMemberWithMemNoAndExCl_ClubOut, [memNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getClubMemberPendingApprove = async (req) => {
    const clubNo = req.body.clubNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubMember.getClubMemberPendingApprove, [clubNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getClubMemberWithClubJoinMember = async (req) => {
    const clubNo = req.body.clubNo
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubMember.getClubMemberWithClubJoinMember, [clubNo])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.insertClubMember = async (req) => {
    const memNo = req.body.memNo
    const clubNo = req.body.clubNo
    const clubJoinDate = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const joinPerDate = null
    const clubOutDate = null

    if(memNo === undefined || memNo === null || clubNo === undefined || clubNo === null){
        return '동아리 가입 실패'
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        // 'insert into club_member(mem_no, club_no, clubjoin_date, joinper_date, clubout_date) values(?,?,?,?,?)'
        let [rows, fields] = await conn.execute(ClubMember.insertClubMember, [memNo, clubNo, clubJoinDate, joinPerDate, clubOutDate])
        return '동아리 가입 성공'
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.updateClubMemberWithJoinPer = async (req) => {
    const memNo = req.body.memNo
    const clubNo = req.body.clubNo
    const joinNo = req.body.joinNo
    const joinPerDate = dayjs().format("YYYY-MM-DD HH:mm:ss")

    if(memNo === undefined || memNo === null || clubNo === undefined || clubNo === null){
        return '동아리 승인 실패'
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubMember.updateClubMemberWithJoinPer, [joinPerDate, joinNo, clubNo])
        if(rows.affectedRows > 0){
            return '동아리 승인 성공'
        } else {
            return '동아리 승인 실패'
        }
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.updateClubMemberWithClubOut = async (req) => {
    const memNo = req.body.memNo
    const clubNo = req.body.clubNo
    const joinNo = req.body.joinNo
    const clubOutDate = dayjs().format("YYYY-MM-DD HH:mm:ss")

    if(memNo === undefined || memNo === null || clubNo === undefined || clubNo === null){
        return '동아리 탈퇴 실패'
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubMember.updateClubMemberWithClubOut, [clubOutDate, joinNo, clubNo])
        if(rows.affectedRows > 0){
            return '동아리 탈퇴 성공'
        } else {
            return '동아리 탈퇴 실패'
        }
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}