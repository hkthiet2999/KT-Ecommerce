const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
let should = chai.should();
chai.use(chaiHttp)

describe('TEST API: /accounts/login', () =>{

    describe('POST accounts/login', () =>{
        it(`Should return BBB`, (done) =>{
            let account = {
                fullname: "string",
                email: "string@gmail.com",
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