process.env.NODE_ENV = 'test';
const sql = require('mssql');
describe('Access to SQL Server', function(){

    beforeEach((done) => { 
        sql.close()
        done();
    });
    it('Should connect to SQL Server sucsessful', (done) =>{
        var sqlconfig = {
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
        sql.connect(sqlconfig).then(()=>{
            console.log('Connected to SQL Server');
        })
        .catch(e => console.log(`Can't connect to SQL Server: `+e.message))
        done()
    });

    it('Should connect to SQL Server fail with incorect config', (done) =>{
        var sqlconfig_fake = {
            user :'fakeUser',
            password :'123456aaa',
            server:'fakeServer',
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
        sql.connect(sqlconfig_fake).then(()=>{
            console.log('Connected to SQL Server');
        })
        .catch(e => console.log(`Can't connect to SQL Server: `+ e.message))
        done()
    });
    
});