import http from './interceptors'

export default {
    install: function (Vue, options) {
        Vue.prototype.$http = http
    }
}


