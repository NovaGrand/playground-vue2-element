const router = require('express').Router()
let n = 0
router.post('/test',async (req, res, next) => {
    try {
        n ++
        console.log(`-------------------${ n }---------------------`)
        // 存储数组空间

        // 接收到数据消息
        // req.on('data',(chunk)=>{
        //     if(chunk){
        //         msg.push(chunk);
        //     }
        // })
        // // 接收完毕
        // req.on('end',()=>{
        //     // 对buffer数组阵列列表进行buffer合并返回一个Buffer
        //     let buf=Buffer.concat(msg);
        //     console.log(buf)//提取Buffer正确
        // })
        // res.send('got it')
    } catch(err){ next(err) }
})

module.exports = router