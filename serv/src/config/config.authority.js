module.exports = (req,res,next) => {
    if(req.method === 'OPTIONS')
        // 跳过浏览器跨域请求前的 preflight 行为
        next()
    else{
        // 如果请求中有 token，说明客户端已登录，则先检查 session 是否过期
        if(true){
            next()
        }
        else
            next()
    }
}