const EXPRESS = require('express')
const SESSION = require('express-session')
const COOKIES = require('cookie-parser')
const IPINFOS = require('express-ip')
const CORS = require('cors')
const ERROR = require('./config/error')
const SERV = EXPRESS()
const PORT = process.env.port || 3001

const API = require('./router')
// 创建连接池，并使其全局可用
global.pool = require('./config/pool')

SERV.use(EXPRESS.json())
SERV.use(EXPRESS.urlencoded())
SERV.use(COOKIES())
// 处理 session 过期的情况
SERV.use('',(req,res,next)=>{
    if(req.method === 'OPTIONS')
        // 跳过浏览器跨域请求前的 preflight 行为
        next()
    else{
        // 如果请求中有 token，说明客户端已登录，则先检查 session 是否过期
        if(true){
            next()
        }
        else
            next()
    }
})

SERV.use(SESSION({
    // 给 session id 的值加盐
    secret: 'FooSudo',
    // 给 session id 起个名字，默认是 connect.sid ，
    name: 'SID',
    // 如果线上环境能提供https访问，则 secure 可为 true
    cookie: { httpOnly: true, secure: false, maxAge: 3000 }, // 会话等待时间为 3秒
    resave: false, // 每次请求之后是否强制保存 session 到 sessionStore
    saveUninitialized: true, // 是否将 session 的原始状态保存到 sessionStore
    rolling: true, // 是否每次请求后都重置 cookie 中的 session id
}))

// 获取访问者 IP 相关信息，包括 ip 地址、国家、时区、城市等
// 通过 req.ipInfo 获取，其属性有 ip, country, region(即省会或州), timezone, city 和 其他
SERV.use(IPINFOS().getIpInfoMiddleware)



// CORS 规则及对应的路由, * 可能不可用
SERV.use(CORS({ credentials: true, origin:'http://localhost:8080', optionsSuccessStatus: 200 }), API)

// 服务端错误的统一处理
SERV.use(ERROR())

SERV.listen(PORT,() => {
    console.log('listening at http://localhost:' + PORT)
})
