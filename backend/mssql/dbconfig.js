const config = {
    user :'sa',
    password :'123456aaa',
    server:'HOANGKIENTHIET',
    database:'SalesWebsite',
    options:{
        encrypt: true,
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS',
        trustServerCertificate: true,
    },
    port : 1433
}

module.exports = config; 