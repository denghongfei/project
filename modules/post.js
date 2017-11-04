let db = require('./db');

// 插入数据
exports.insert = (data, cb) => {
    // sql 语句
    let query = 'insert into posts set ?';
    // 执行 sql 语句
    db.query(query, data, (err) => {
        if(err) {
            // 失败回调
            return cb(err);
        }
        // 成功回调
        cb(null);
    })

}

exports.findAll = (cb) => {
    let query = 'select * from posts';
    
    db.query(query, (err, rows) => {
        if(err) {
            return cb(err);
        }
        cb(null, rows);
    });
}

exports.delete = (id, cb) => {

    let query = 'delete from posts where id = ?';

    db.query(query, id, (err) => {
        if(err) {
            return cb(err);
        }
        cb(null);
    })     
}



