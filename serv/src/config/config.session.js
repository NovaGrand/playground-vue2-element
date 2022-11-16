const SESSION = require('express-session')

module.exports = SESSION({
    // 给 session id 的值加盐
    secret: 'FooSudo',
    // 给 session id 起个名字，默认是 connect.sid ，
    name: 'SID',
    // 如果线上环境能提供https访问，则 secure 可为 true
    cookie: {
        httpOnly: false, // 开启后 req.cookies 中无法获取 SID，如果后端不使用该值，则可设为 true
        secure: false,  // 只能通过 https 传输 SID
        maxAge: 60000  // SID 有效期，单位为毫秒
    },
    resave: false, // 每次请求之后是否强制保存 session 到 sessionStore
    saveUninitialized: true, // 是否将 session 的原始状态保存到 sessionStore
    rolling: true, // 是否每次请求后都重置 cookie 中的 session id
})
