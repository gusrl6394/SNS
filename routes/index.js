var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get("/login", function(req, res){
  res.clearCookie('id');
  res.clearCookie('memNo');
  res.clearCookie('id');
  res.clearCookie('name');
  res.clearCookie('nickName');
  res.render("login");
});

router.get("/signin", function(req, res){
  res.render("signin");
});

router.post("/organization", function(req, res){
  console.log(req.body);
  // let {id, memNo, nickname} = JSON.parse(req.body.some_data)
  // let data = {
  //   'id' : id,
  //   'memNo' : memNo,
  //   'nickname' : nickname
  // }
  res.render("organization", JSON.parse(req.body.some_data));
});

router.post("/create", function(req, res){
  console.log(req.body);
  res.render("create", JSON.parse(req.body.some_data));
});

router.post("/post", function(req, res){
  console.log(req.body);
  res.render("post", JSON.parse(req.body.some_data));
});

router.post("/compose", function(req, res){
  console.log(req.body);
  res.render("compose", JSON.parse(req.body.some_data));
});

router.post("/approve", function(req, res){
  console.log(req.body);
  res.render("approve", JSON.parse(req.body.some_data));
});

router.post("/new", function(req, res){
  console.log(req.body);
  res.render("new", JSON.parse(req.body.some_data));
});

module.exports = router;
