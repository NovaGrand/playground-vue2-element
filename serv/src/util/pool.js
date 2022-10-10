
const pool = require ('mysql2').createPool({
    host: 'localhost',
    database: 'herneck',
    user: 'root',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    // The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there is no limit to the number of queued connection requests. (Default: 0)
    queueLimit: 0
})

process.on('exit', async (code) => {
    try { await pool.end() } catch (e) {}
})

module.exports = pool