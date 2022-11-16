const router = require('express').Router()
let n = 0
router.all('/test',async (req, res, next) => {
    try {
        n ++
        console.log(`----------------------${n}-----------------------`)
        res.send('OK')
    } catch(err){ next(err) }
})

module.exports = router