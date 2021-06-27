const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
chai.should();
chai.use(chaiHttp)

describe('TEST API: /accounts/register', () =>{

    describe('POST accounts/register', () =>{
        it(`Should return CCC`, (done) =>{
            let account = {
                fullname: "string",
                email: "string@gmail.com",
                password: "string",
                confirm_password: "string"
            }
            
            chai.request(server)
            .post('accounts/login')
            .send(account)
            .end((err,res) => {
                // res.should.have.status(200);
            done()
            })
        })
    })
})