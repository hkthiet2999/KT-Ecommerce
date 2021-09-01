const sql = require('mssql');


const sqlconfig = require('./mssql-config/dbconfig');
const connection = sql.connect(sqlconfig).then(()=>{
  console.log('Connected to SQL Server');
})
.catch(e => console.log(`Can't connect to SQL Server: `+e.message))


module.exports = connection;