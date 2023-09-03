exports.getMember = 'select * from member where mem_no = ?'
exports.getMembers = 'select * from member'
exports.insertMember = 'insert into member(id, pw, name, nickname, birthday, e_mail, cell_phone, loc_cd, join_date, out_date, about) values(?,?,?,?,?,?,?,?,?,?,?)'
exports.updateMember = 'update member set id = ?, pw = ?, name = ? nickname = ? birthday = ?, e_mail = ?, cell_phone = ?, loc_cd = ?, join_date = ?, out_date = ?, about = ? where mem_no = ?'
exports.deleteMember = 'delete from member where mem_no = ?'
exports.lastIndex = 'select mem_no from member order by mem_no desc limit 1'
exports.getMemberWithId = 'select * from member where id = ?'
exports.getMemberWithName = 'select * from member where name = ?'
exports.updatePwMember = 'update member set pw = ? where mem_no = ?'
exports.getMemberWithIdAndPW = 'select * from member where id = ? and pw = ?'