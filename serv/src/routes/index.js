const router = require('express').Router()

router.use(require('./bigFileUpload'))
router.use(require('./user'))
router.use(require('./socket'))
router.use(require('./test'))
router.use(require('./api')) // api路由一定要放到最后，否则有可能会被先执行，导致其他路由失效

module.exports = router