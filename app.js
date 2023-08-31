const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const memberRouter = require('./src/routes/member-route');
const clubRouter = require('./src/routes/club-route');

const cors = require('cors')
let corsOptions = {
    origin: '*',      // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));

app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/member', memberRouter);
app.use('/api/club', clubRouter);

const options = { root: __dirname };
app.get("/login", function(req, res){
    res.clearCookie('id');
    res.clearCookie('memNo');
    res.clearCookie('id');
    res.clearCookie('name');
    res.clearCookie('nickName');
    res.sendFile("public/login.html", options);
});
app.get("/signIn", function(req, res){
    res.sendFile("public/signIn.html", options);
});
app.get("/organization", function(req, res){
    let cookies = req.cookies;
    let { id } = cookies;
    res.sendFile("public/organization.html", options);
});
app.get("/approve", function(req, res){
    res.sendFile("public/approve.html", options);
});
app.get("/compose", function(req, res){
    res.sendFile("public/compose.html", options);
});
app.get("/create", function(req, res){
    res.sendFile("public/create.html", options);
});
app.get("/information", function(req, res){
    res.sendFile("public/information.html", options);
});
app.get("/member", function(req, res){
    res.sendFile("public/member.html", options);
});
app.get("/mypage", function(req, res){
    res.sendFile("public/mypage.html", options);
});
app.get("/new", function(req, res){
    res.sendFile("public/new.html", options);
});
app.get("/post", function(req, res){
    res.sendFile("public/post.html", options);
});


module.exports = app;
