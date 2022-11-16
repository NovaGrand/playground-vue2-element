// 处理 websocket 相关业务
const router = require('express').Router()
let n = 0
router.all('/socket',async (req, res, next) => {
    try {
        // 获取当前所有已连接客户端
        // 遍历每个客户端，筛选数据状态，获得符合条件的客户端
        n ++
        console.log(`-------------------${ n }---------------------`)
        // req.session.aaaa='aaaa'
        // req.io.emit('testtest')
        res.send('OK!')
    } catch(err){ next(err) }
})

module.exports = router