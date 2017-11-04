let express = require('express');

let bodyParser = require('body-parser');

let session = require('express-session');

let app = express();

app.listen(3000);

app.set('views', './views');

app.set('view engine', 'xtpl');

app.use(express.static('./public'));

//解析post数据的中间件
app.use(bodyParser.urlencoded({extended: false}));

//处理 session 的中间件
//当使用了 session 中间件后, 就在 req上添加了一个 session属性,通过这个属性可以实限设置和读取session的目的
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized: false
    
}));

//在nodejs中默认情况下 session 是放到内存当中的 ,所以当服务器重启后,session也会消失
//http 要求在请求头之前不允许有响应主体
app.use('/admin', (req, res, next) => {
    //检测登录
    if(!req.session.loginfo &&  req.url != '/login') {
        // return res.redirect('/login');
    }
    next();
})
//可以通过路由来区分前台网站和后台网站,但是前/后台网站又可以分为若干自路由

//使用 express.Router() 来创建主路由,主路由可以认为是一个中间件

//主路由下再创建子路由

let admin = require('./routes/admin');

let home = require('./routes/home');


app.use('/admin',admin);

app.use('/', home);