let badRequest = 0

module.exports = () => {
    return (err, req, res, next) => {
        if(err.toString().includes('is not a function')){
            badRequest ++
            console.log('发现恶意请求 : ' + badRequest)
            // if(badRequest > 9){
            //     req.pool.query("UPDATE log SET value=value+10 WHERE type='badRequest'",(err,rows) => {
            //         badRequest = 0
            //     })
            // }
        }
        res.status(500).json({
            error: 'bad request'
            // error: util.format(err)
        })
    }
}
