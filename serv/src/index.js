const EXPRESS = require('express')
const app = EXPRESS()

const httpServer = require("http").createServer(app)

// 将 json 字符串转为对象
app.use(EXPRESS.json({limit: '50mb'}))
// 将请求路径转为 req.query req.params 等
app.use(EXPRESS.urlencoded({limit: '50mb'}))
// 将 req.cookie 中的字符串转为 req.cookies 对象，一般只用于用户相关路由
app.use(require('cookie-parser')())


// CORS 规则，可根据路由设置不同的CORS规则，较少使用，需要时再看文档吧
app.use(require('./config/config.cors'))
// session 事关用户数据和权限，因此应置于路由中间件之前
app.use(require('./config/config.session'))
// 请求的登陆状态、权限控制等
app.use(require('./config/config.authority'))

// 挂载 socket.io，通过 req.io 调用，req.io.emit 等效于 socket.emit
app.use(require('./config/config.io')(httpServer))
// 挂载路由
app.use(require('./routes'))
// 服务端错误的统一处理
app.use(require('./config/config.error'))

// 将连接池挂载到应用实例上，通过 req.app.pool 或 res.app.pool 调用
app.pool = require('./config/config.pool')


httpServer.listen(3001,() => {
    console.log('listening at http://localhost:' + 3001)
})

