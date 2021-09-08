process.env.NODE_ENV = 'test'
const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp)

// 
describe('POST /accounts/login', () => {
    const Account = require('../../../../models/AccountModel')

    beforeEach((done) => {

        Account.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            }
        });
        done();
    });

    beforeEach((done) => {

        // 1. Register 
        var account = {
            fullname: "tester",
            email: "tester@gmail.com",
            password: "tester123456",
            confirm_password: "tester123456"
        }
        chai.request(server)
            .post('/accounts/register')
            .send(account)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                done()
            })
    })

    it(`Should Forgot Password successful then send the new password by Email`, (done) => {
        var account = {
            email: "tester@gmail.com"
        }
        chai.request(server)
            .post('/accounts/forgot-password')
            .send(account)
            .end((err, res) => {
                // Asserts                        
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                done()
            })
    })

    it('Should Forgot Password failed with invalid or incorect email', (done) => {
        // check by validator middleware
        var account_invalid = {
            email: "tester-fake"
        }
        chai.request(server)
            .post('/accounts/forgot-password')
            .send(account_invalid)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body).to.be.a('object');
                console.log(res.body)
                done()
            })
    })

    it('Should Forgot Password with Email does not exist', (done) => {
        // check by validator middleware
        var account_invalid = {
            email: "tester_fake@gmail.com"
        }
        chai.request(server)
            .post('/accounts/forgot-password')
            .send(account_invalid)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body).to.be.a('object');
                console.log(res.body)
                done()
            })
    })

})
