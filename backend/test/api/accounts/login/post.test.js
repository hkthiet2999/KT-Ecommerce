process.env.NODE_ENV='test'
const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp)

// 
describe('POST /accounts/login', () =>{
    const Account = require('../../../../models/AccountModel')

    beforeEach((done) => { 
        Account.deleteMany({}, function(err) {
            if (err) {
                console.log(err);
            }
        });
        done();
    });

    beforeEach((done)=>{
        
        var newAccount = new Account({
            fullname: "tester",
            email: "tester@gmail.com",
            password: "tester123456"
        });
        newAccount.save();
        done();
    })

    it(`Should login successful`, (done) =>{
        var account = {
            email: "tester@gmail.com",
            password: "tester123456",
        }
        
        chai.request(server)
        .post('/accounts/login')
        .send(account)
        .end((err,res) => {
            // Asserts                        
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            res.body.should.have.property('token')
            console.log(res.body)                   
        done()
        })
    })

    it('Should login failed with incorect email', (done)=>{
        // check by validator middleware
        var account_invalid = {
            email: "tester",
            password: "tester123456",
        }
        chai.request(server)
        .post('/accounts/login')
        .send(account_invalid)
        .end((err,res) => {
            expect(res.status).to.be.equal(400);   
            expect(res.body).to.be.a('object');
            console.log(res.body)
        done()
        })
    })
})
