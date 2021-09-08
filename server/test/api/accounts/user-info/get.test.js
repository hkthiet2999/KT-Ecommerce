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

    it(`Should Get the User Info fail with incorect user_id`, (done) => {
        var account = {
            email: "tester@gmail.com",
            password: "tester123456",
        }
        // 2. Login
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
                // 3. Get User Info
                chai.request(server)
                    .get('/accounts/user-info')
                    .set('token', token)
                    .set('user_id', 'fake-user-id')
                    .end((err, res) => {
                        res.should.have.status(400);
                        // res.body.should.be.a('object');
                        // console.log(res.body)
                        done()
                    })
            })
    })

    it(`Should Get the User Info successful`, (done) => {
        var account = {
            email: "tester@gmail.com",
            password: "tester123456",
        }
        // 2. Login
        chai.request(server)
            .post('/accounts/login')
            .send(account)
            .end((err, res) => {
                // Asserts                        
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                res.body.should.have.property('token')
                var token = res.body.token
                var user_id = res.body.id
                // 3. Get User Info
                chai.request(server)
                    .get('/accounts/user-info')
                    .set('token', token)
                    .set('user_id', user_id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        console.log(res.body)
                        done()
                    })
            })
    })

    it(`Should Get the User Info fail with with unauthorized user`, (done) => {
        var account = {
            email: "tester@gmail.com",
            password: "tester123456",
        }
        // 2. Login
        chai.request(server)
            .post('/accounts/login')
            .send(account)
            .end((err, res) => {
                // Asserts                        
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                res.body.should.have.property('token')
                console.log(res.body)
                var token = 'have-no-token'
                var user_id = 'fake-user-id'
                // 3. Get User Info
                chai.request(server)
                    .get('/accounts/user-info')
                    .set('token', token)
                    .set('user_id', user_id)
                    .end((err, res) => {
                        res.should.have.status(401);
                        // res.body.should.be.a('object');
                        // console.log(res.body)
                        done()
                    })
            })
    })




})
