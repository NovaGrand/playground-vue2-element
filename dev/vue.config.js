let fs = require('fs')
module.exports = {
    devServer: {
        // port: 8080,
        // proxy: [{
        //     context: ['/'],  //将 "https://urlname.com:8080/api" 转发到 "https://127.0.0.1:6495/api"
        //     target: 'https://127.0.0.1:6495',
        //     secure: false,
        //     changeOrigin: true
        // }],
        // port: 80,
        // allowedHosts: [ 'novagrand.dev','localhost','0.0.0.0' ],
        // https: {
        //     key: fs.readFileSync( "./novagrand.dev-key.pem"),
        //     cert: fs.readFileSync("./novagrand.dev.pem"),
        // },
    },
}
