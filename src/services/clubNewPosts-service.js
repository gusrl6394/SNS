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
                    'likeCnt' : 0
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
                    'likeCnt' : 0
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
        let [rows2, filed2] = await conn.execute(sql2, params)
        if(rows2.length > 0){
            for(var i=0; i<rows2.length; i++){
                for(var j=0; j<writingData.length; j++){
                    if(writingData[j].writing_no === rows2[i].writing_no){
                        writingData[j].likeCnt += 1
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