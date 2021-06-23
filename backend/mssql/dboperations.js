var config = require('./dbconfig');
const sql = require('mssql');


async function check_Connect() {
    try {
        let pool = await sql.connect(config);
        let accounts = await pool.request().query("SELECT * from Accounts");
        return accounts.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    check_Connect: check_Connect
}