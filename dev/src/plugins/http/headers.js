import axios from 'axios'

// axios 代码是在页面域(前端服务器)中执行的，因此页面域的 cookie 与 axios 提交域不同，因此默认的 AJAX 不携带 cookie

// 为了让每次请求都能携带 cookie，要开启下面的功能，但该功能与七牛云的 CORS 规则冲突
// axios.defaults.withCredentials = true

// 请求头设置可分两处，一处在此直接设置，另一处在拦截器中设置
export default axios.create({
    baseURL: 'http://localhost:3001', // process.env.baseURL 的值在 vite.config.js 中定义
    timeout: 6000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})