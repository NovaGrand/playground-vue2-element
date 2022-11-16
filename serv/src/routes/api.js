// 存放自动 CRUD 业务
// 根据接口自动生成查询语句，是很重要的一项功能
// 等熟悉 Strapi 等内容管理系统的接口设计后，再研究吧
const router = require('express').Router()
let n = 0

// 处理指定路径参数，将其并入 SQL 语句
router.param('id', function(req, res, next, id) {
    console.log('CALLED ONLY ONCE');
    next();
});

router.all('/api',async (req, res, next) => {
    try {
        console.log(req.method) // 获取方法名，转为 SELECT UPDATE DELETE 语句
        n ++
        console.log(`-------------------${ n }---------------------`)
        res.send('got it')
    } catch(err){ next(err) }
})

module.exports = router