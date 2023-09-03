const MemberService = require('../services/member-service')

exports.getMember = async (req, res, next) => {
    let { member_no } = req.params
    try {
        let rows = await MemberService.getMember(member_no)
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getMembers = async (req, res, next) => {
    try {
        let rows = await MemberService.getMembers()
        return res.json(rows)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.insertMember = async (req, res, next) => {
    try {
        let [rows, message] = await MemberService.insertMember(req)
        return res.json(message)
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.getMemberWithIdAndPW = async (req, res, next) => {
    try {
        let [rows, message] = await MemberService.getMemberWithIdAndPW(req)
        if(message === '로그인 성공'){
            let {mem_no, id, name, nickname} = rows[0];
            if(nickname === null){
                nickname = '';
            }
            let information = {
                'memNo' : mem_no,
                'id' : id,
                'name' : name,
                'nickName' : nickname
            }
            // res.cookie('memNo', mem_no);
            // res.cookie('id', id);
            // res.cookie('name', name);
            // res.cookie('nickName', nickname);
            // res.cookie('id',req.body.id);
            return res.json({msg : message, data : information})
        } else {
            return res.json(message)
        }
    } catch (e) {
        return res.status(500).json(e)
    }
}