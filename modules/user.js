let db = require('./db');

//插入用户
exports.insert = function (data, cb) {

    let query = 'insert into users set ?';

    //密文处理
    data.pass = db.md5(data.pass);

    db.query(query, data, (err) => {
        if (err) {
            return cb(err);
        }
        cb(null, rows[0]);
    });
}

exports.auth = function (email, password, cb) {

    let query = 'select * from users where email = ?';

    db.query(query, email, (err, rows) => {

        if (err) {
            return cb(err);
        }

        //数据库中的密码与用户提交上的密码  如果一致,则认证通过(登录成功)
        if (rows[0].pass == db.md5(password)) {
            return cb(null, rows[0]);
        }

        cb({ msg: '用户名或密码错误' });

    });
}

//查询个人资料
exports.find = (id, cb) => {

    let query = 'select * from users where id = ?';

    db.query(query, id, (err, rows) => {
        if (err) {
            return cb(err);
        }
        cb(null, rows);
    })

}

exports.update = function (id, data, cb) {

    let query = 'update users set ? where id = ?';  
    
    db.query(query, [data,id], (err) => {
        if(err) {
            return cb(err);
        }
        cb(null);
    })
}
