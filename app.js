const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const bodyParser = require("body-parser")
// const parser = bodyParser.urlencoded({extended:false});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const memberRouter = require('./src/routes/member-route');
const clubRouter = require('./src/routes/club-route');
const clubMemberRouter = require('./src/routes/clubMember-route');
const postRouter = require('./src/routes/post-route');
const commentRouter = require('./src/routes/comment-route');
const likeRouter = require('./src/routes/like-route');

const cors = require('cors')
let corsOptions = {
    origin: '*',      // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap-icons")));

app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/member', memberRouter);
app.use('/api/club', clubRouter);
app.use('/api/clubMember', clubMemberRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/like', likeRouter);

// const options = { root: __dirname };


// app.post("/organization", parser, function(req, res){
//     // let cookies = req.cookies;
//     // let { id } = cookies;
//     console.log(req.body.id)
//     console.log(req.params.id)
//     res.render("organization");
// });
// app.get("/approve", function(req, res){
//     res.render("approve");
// });
// app.get("/compose", function(req, res){
//     res.sendFile("public/compose.ejs", options);
// });
// app.get("/create", function(req, res){
//     res.sendFile("public/create.ejs", options);
// });
// app.get("/information", function(req, res){
//     res.sendFile("public/information.ejs", options);
// });
// app.get("/member", function(req, res){
//     res.sendFile("public/member.ejs", options);
// });
// app.get("/mypage", function(req, res){
//     res.sendFile("public/mypage.ejs", options);
// });
// app.get("/new", function(req, res){
//     res.sendFile("public/new.ejs", options);
// });
// app.get("/post", function(req, res){
//     res.sendFile("public/post.ejs", options);
// });


module.exports = app;
