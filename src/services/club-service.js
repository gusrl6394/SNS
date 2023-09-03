const pool = require('../database/pool')
const ClubQuery = require('../queries/club-query')
const dayjs = require("dayjs")

exports.getClub = async (club_no) => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubQuery.getClub, [club_no])
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.getClubs = async () => {
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, fields] = await conn.execute(ClubQuery.getClubs)
        return rows
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}

exports.insertClub = async (req) => {
    const clubName = req.body.clubName
    const memNo = req.body.memNo
    const madeDate = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const hobbyCo = null

    let conn  = await pool().catch(err => console.log(err));
    try {
        let [result, temp] = await conn.execute(ClubQuery.getClubWithClubname, [clubName])
        if(result.length > 0){
            return [null, '동아리 이름 중복']
        }

        // 'insert into club(clubname, mem_no, made_date, hobby_co) values(?,?,?,?)'
        let [rows, fields] = await conn.execute(ClubQuery.insertClub, [clubName, memNo, madeDate, hobbyCo])
        return [rows, '동아리 생성 성공']
    } catch (e) {
        console.log(e)
        throw Error(e)
    } finally {
        conn.release()
    }
}