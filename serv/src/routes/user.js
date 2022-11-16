// 用户注册、登录、权限检查
const router = require('express').Router()
const IPINFOS = require('express-ip')

// 根据访问者 IP 获取地理位置相关信息，包括 国家、时区、城市等
router.use(IPINFOS().getIpInfoMiddleware)

// controller 与 router 的用法
// const  {
//     getProducts,
//     getProduct,
//     createProduct,
//     updateProduct,
//     deleteProduct
// } = require('../controllers/users.js')
// router.get('/', getProducts)
// router.get('/:productID', getProduct)
// router.post('/', createProduct)
// router.put('/:productID', updateProduct)
// router.delete('/:productID', deleteProduct)

let n = 0
router.all('/user',async (req, res, next) => {
    try {
        n ++
        console.log(`-------------------${ n }---------------------`)
        // console.log(req.ipInfo) //获取当前用户的地理信息
        console.log(req.cookies)
        res.send('user OK')
    } catch(err){ next(err) }
})

module.exports = router