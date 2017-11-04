
let express = require('express');

let post = require('../modules/post');

let user = require('../modules/user');

let admin = express.Router(); 
admin.get('/', (req, res) => {
    res.render('admin/index', {}); 
});

admin.get('/settings', (req, res) => {

    //通过session获得用户的id
    let uid = req.session.loginfo.id;

    user.find(uid,(err, rows) => {
        if(!err) {
            res.render('admin/settings', {user: rows[0]});
        }
    });

   
})


admin.get('/add', (req,res) =>  {
    res.render('admin/add', {});
});

//文章列表
admin.get('/list', (req, res) => {

    post.findAll((err, rows) => {
        if(err) {
            return res.send('数据库错误');
        }
        //
        res.render('admin/list', {posts: rows});
    }); 
});


admin.get('/logout', (req, res) => {
    req.session.loginfo = null;

    res.redirect('/login');
})

//添加博客
admin.post('/add', (req, res) => {
    // 获得表单提交的博客内容
    console.log(req.body);

    // 当前登录用户即为作者
    // 通过session可以读取到作者的id
    // 然后将id记录在博客文章中
    req.body.uid = req.session.loginfo.id;
    // 插入博客内容
    post.insert(req.body, (err) => {
        if(!err) {
            // 成功后响应结果
            res.json({
                code: 10000,
                msg: '添加成功!'
            });
        }
    })

});
//文章删除
admin.get('/delete', (req, res) => {
    //通过query 可以接收 get 的参数
    console.log(req.query);
    post.delete(req.query.id, (err) => {
        if(!err) {
            res.json({
                code: 10000,
                msg: '删除成功'
            });
        }
    });
})

admin.post('/update', (req, res) => {

    let uid = req.session.loginfo.id;

    console.log(req.body);
    user.update(uid, req.body, (err) => {
        if(!err) {
            res.json({
                code: 10000,
                msg: '更新成功'
            });
        }
    });
})



module.exports = admin;