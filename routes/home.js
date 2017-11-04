
let express = require('express');

//处理用户数据
let user = require('../modules/user');

let home = express.Router();
home.get('/',(req, res) => {
    res.render('home/index', {});
});

home.get('/article', (req, res) => {
    res.render('home/article', {});
});

//注册
home.get('/register', (req, res) => {
    res.render('home/register', {});
})

//登录
home.get('/login', (req, res) => {
    res.render('home/login', {});
})

//注册用户  
home.post('/register', (req, res) => {
    
    
    user.insert(req.body, (err) => {
        if(!err) {
            res.json({
                code: 10000,
                msg: '添加成功'
            });
        }
    });
});

//用户登录
home.post('/login', (req, res) => {
    // console.log(req.body);
    user.auth(req.body.email, req.body.pass, (err,row) => {
   
        if(!err) {
            // //存一个session
            //如果req.session.loginfo不为false, 则认为登录成功
            
            req.session.loginfo = row;
            res.json({
                code: 10000,
                msg: '登录成功'
            });
        }  
    });
});

module.exports = home;