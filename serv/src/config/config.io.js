const { Server } = require("socket.io")

// socket.io 虽然被广泛使用，接口经常变动，但官方文档维护不利，业务相关功能最好自己实现
// socket.io 有自己的 session 用法，但冗长复杂，官方的 socket session 方案也不是自动更新，更新时需要断线重连
// 建议通过 http 请求触发事件和传递参数
module.exports = function (httpServer) {
    let io = new Server(httpServer, {cors:{origin:"*"}})

    io.on("connection", (socket) => {
        // 接收或发送消息
        socket.on("message", (msg, name) => {
            // socket.emit 向当前连接的 socket 客户端即 socket.on 的触发者）发送消息
            // socket.emit("message", `【${name}】的个人消息 : ${msg}`)
            // socket.broadcast.emit 向除自己外所有其他已连接客户端发消息
            socket.broadcast.emit("message", `【${name}】的广播 : ${msg}`)
        })
        // 加入房间
        // room 可以是任意字符串，也可以是 SocketID，同一个 room 中的连接者，都会收到 socket.emit 消息
        // 同一个客户端可同时在多个 room
        socket.on("join-room",(room,dad,aawd)=>{
            // 当前连着的客户端加入指定的房间
            socket.join(room)
            // 向一个或多个房间发送消息
            // socket.to("room1").to("room2").emit(/* ... */)
        })

        // 超级广播，对所有已连接客户端发送广播
        // io.emit(/* ... */)

        // 服务端调用客户端的回调函数
        // 第三个参数 callback 就是客户端传来的
        socket.on("callback-test",(aaa,bbb,callback)=>{
            socket.emit("message", `收到`)
            callback('Blablabla')
        })
        socket.on('aaa',msg=>{
            console.log('aaa')
        })
        // 延时发送事件
        socket.timeout(5000).emit("my-event", (err) => {
            if (err) {
                // the other side did not acknowledge the event in the given delay
            }
        })
        // 客户端断开事件(只在浏览器标签关闭时生效)
        // 可被动触发也可以主动触发
        socket.on('disconnect', function () {

        })
    })
    return function (req, res, next) {
        req.io = res.io = io
        next()
    }
}
