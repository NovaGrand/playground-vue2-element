const CORS = require('cors')

module.exports = CORS({
    credentials: true,
    origin:'http://localhost:8080',
    optionsSuccessStatus: 200
})