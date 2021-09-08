process.env.NODE_ENV = 'test'
const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp)

// 
describe('POST /accounts/reset-password', () => {
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


    it('Should reset-password successful', (done) => {
        // 2. Login
        var account = {
            email: "tester@gmail.com",
            password: "tester123456",
        }
        chai.request(server)
            .post('/accounts/login')
            .send(account)
            .end((err, res) => {
                // Asserts                        
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                res.body.should.have.property('token')
                console.log(res.body)
                var token = res.body.token
                var account = { email: "tester@gmail.com", password: "newpassword" }
                // 3. Reset Passord
                chai.request(server)
                    .post('/accounts/reset-password')
                    .set('token', token)
                    .send(account)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('object');
                        done()
                    })
            })
    })

    it('Should reset-password fail with email does not exis', (done) => {
        // 2. Login
        var account = {
            email: "tester@gmail.com",
            password: "tester123456",
        }
        chai.request(server)
            .post('/accounts/login')
            .send(account)
            .end((err, res) => {
                // Asserts                        
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                res.body.should.have.property('token')
                console.log(res.body)
                var token = res.body.token
                var account = { email: "testerfake@gmail.com", password: "newpassword" }
                // 3. Reset Passord
                chai.request(server)
                    .post('/accounts/reset-password')
                    .set('token', token)
                    .send(account)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(400);
                        expect(res.body).to.be.a('object');
                        done()
                    })
            })
    })
})
