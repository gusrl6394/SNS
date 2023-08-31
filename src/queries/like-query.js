exports.getlikesWithPost = 'select * from like where writing_no = ?'
exports.getlikesCntWithPost = 'select count(*) as cnt from like where writing_no = ?'
exports.getlikesWithMemNo = 'select * from like where mem_no = ?'
exports.insertLike = ''