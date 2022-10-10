import http from './headers'


// 请求拦截
http.interceptors.request.use(
    function(config){
        // config.headers.token = store.state.user.token
        return config
    },
    function(err){
        return Promise.reject(err)
    }
)


// 响应拦截
http.interceptors.response.use(function (response) {
    // console.log(response)
        if(response.status === 403){
            window.location.href = window.location.origin + "/account/login"
        }
        
        return response
    },
    
    function (err) {
        return Promise.reject(err)
    })

export default http