const pool = require("../database/pool");

exports.postsWithComment  = async (clubNoArr) => {
    const placeholders = clubNoArr.map(() => '?').join(',');
    const params = clubNoArr;
    const sql1 = "SELECT posts.writing_no, posts.mem_no, posts.club_no, posts.post_code, posts.posts_title, posts.posts_content, posts.posts_date, "
                      + "commentdb.seq_no AS cm_seq_no, commentdb.mem_no AS cm_mem_no, commentdb.`comment` AS cm_comment, commentdb.comment_date AS cm_comment_date "
                      + "FROM posts "
                      + "LEFT OUTER join commentdb "
                      + "ON posts.writing_no = commentdb.writing_no "
                      + "WHERE posts.club_no IN ("+placeholders+") "
                      + "ORDER BY posts.writing_no";
    let conn  = await pool().catch(err => console.log(err));
    try {
        let [rows, field1] = await conn.execute(sql1, params)
        var writingData = []
        for(var i=0; i<rows.length; i++){
            if(writingData.length === 0){
                var temp = {
                    'writing_no' : rows[i].writing_no,
                    'mem_no' : rows[i].mem_no,
                    'club_no' : rows[i].club_no,
                    'post_code' : rows[i].post_code,
                    'posts_title' : rows[i].posts_title,
                    'posts_content' : rows[i].posts_content,
                    'posts_date' : rows[i].posts_date,
                    'commentCnt' : 1,
                    'likeCnt' : 0,
                    'id' : '',
                    'name' : '',
                    'nickname' : '',
                    'clubMemNo' : 0,
                    'clubname' : ''
                }
                writingData.push(temp)
            } else if(writingData[writingData.length-1].writing_no < rows[i].writing_no) {
                var temp = {
                    'writing_no': rows[i].writing_no,
                    'mem_no': rows[i].mem_no,
                    'club_no': rows[i].club_no,
                    'post_code': rows[i].post_code,
                    'posts_title': rows[i].posts_title,
                    'posts_content': rows[i].posts_content,
                    'posts_date': rows[i].posts_date,
                    'commentCnt': 1,
                    'likeCnt' : 0,
                    'id' : '',
                    'name' : '',
                    'nickname' : '',
                    'clubMemNo' : 0,
                    'clubname' : ''
                }
                writingData.push(temp)
            } else {
                writingData[writingData.length-1].commentCnt += 1
            }
        }

        const sql2 = "SELECT posts.writing_no, posts.mem_no, posts.club_no, "
            + "likedb.seq_no AS li_seq_no, likedb.writing_no AS li_writing_no, likedb.mem_no AS li_mem_no "
            + "FROM posts "
            + "LEFT OUTER join likedb "
            + "ON posts.writing_no = likedb.writing_no "
            + "WHERE posts.club_no IN ("+placeholders+") "
            + "ORDER BY posts.writing_no";
        let [rows2, field2] = await conn.execute(sql2, params)
        if(rows2.length > 0){
            for(var i=0; i<rows2.length; i++){
                for(var j=0; j<writingData.length; j++){
                    if(writingData[j].writing_no === rows2[i].writing_no){
                        writingData[j].likeCnt += 1
                    }
                }
            }
        }

        let memNoSet = new Set()
        for(var i=0; i<writingData.length; i++){
            memNoSet.add(writingData[i].mem_no)
        }
        let memNoArr = [...memNoSet]
        const placeholders2 = memNoArr.map(() => '?').join(',');
        const sql3 = `select mem_no, id, name, nickname from member where mem_no in (` + placeholders2 + `)`;
        let [rows3, field3] = await conn.execute(sql3, memNoArr)

        if(rows3.length > 0){
            for(var i=0; i<rows3.length; i++){
                for(var j=0; j<writingData.length; j++){
                    if(writingData[j].mem_no == rows3[i].mem_no){
                        writingData[j].id = rows3[i].id
                        writingData[j].name = rows3[i].name
                        writingData[j].nickname = rows3[i].nickname
                    }
                }
            }
        }

        const sql4 = `select club_no, clubname, mem_no as clubMemNo from club where club_no in (` + placeholders + `)`;
        let [row4, field4] = await conn.execute(sql4, clubNoArr)
        if(row4.length > 0){
            for(var i=0; i<row4.length; i++){
                for(var j=0; j<writingData.length; j++){
                    if(writingData[j].club_no == row4[i].club_no){
                        writingData[j].clubname = row4[i].clubname
                        writingData[j].clubMemNo = row4[i].clubMemNo
                    }
                }
            }
        }

        return [writingData, null]
    } catch (e) {
        console.log(e)
        throw  Error(e)
    } finally {
        conn.release()
    }
}