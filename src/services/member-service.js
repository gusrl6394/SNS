const pool = require('../database/pool')
const MemberQuery = require('../queries/member-query')
const dayjs = require("dayjs")

exports.getMember = async (member_no) => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(MemberQuery.getMember, [member_no])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getMembers = async () => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(MemberQuery.getMembers)
        return rows
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.insertMember = async (req) => {
    const id = req.body.id
    const pw = req.body.pw
    const name = req.body.name === undefined ? null : req.body.name
    let nickname = req.body.nickname === undefined ? null : req.body.nickname
    const birthday = req.body.birthday === undefined ? null : req.body.birthday
    const e_mail = req.body.e_mail === undefined ? null : req.body.e_mail
    const cell_phone = req.body.cell_phone === undefined ? null : req.body.cell_phone
    const loc_cd = req.body.loc_cd === undefined ? null : req.body.loc_cd
    const join_date = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const out_date = null
    const about = req.body.about === undefined ? null : req.body.about

    if(id === undefined || id === null || pw === undefined || pw === null || name === undefined || name === null){
        return [null, '회원가입 실패']
    }

    if(nickname === undefined || nickname === null){
        nickname = name;
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [idSearch, status1] = await conn.execute(MemberQuery.getMemberWithId, [id])
        if(idSearch.length > 0){
            return [idSearch, 'ID중복']
        }
        let [lastIndex, status2] = await conn.execute(MemberQuery.lastIndex)
        let [rows, fields] = await conn.execute(MemberQuery.insertMember, [id, pw, name, nickname, birthday, e_mail, cell_phone, loc_cd, join_date, out_date, about])
        return [rows, '회원가입 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}

exports.getMemberWithIdAndPW = async (req) => {
    const id = req.body.id
    const pw = req.body.pw
    if(id === undefined || id === null || pw === undefined || pw === null){
        return [null, '로그인 실패']
    }

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(MemberQuery.getMemberWithIdAndPW, [id, pw])
        if(rows.length === 1){
            return [rows, '로그인 성공']
        } else {
            return [rows, '로그인 실패']
        }
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}