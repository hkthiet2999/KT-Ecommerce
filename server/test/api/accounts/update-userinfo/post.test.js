process.env.NODE_ENV = 'test'
const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp)

// 
describe('POST /accounts/update-userinfo', () => {
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

    it(`Should Update user-info successful`, (done) => {
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
                var user_id = res.body.id
                var userUpdate = {
                    fullname: 'Updated User Name',
                    avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1464209883914807&height=50&width=50&ext=1632469496&hash=AeTGBFEgcStsd8NYyh8',
                    birthday: '02/09/1999',
                    address: 'Mỹ Tho',
                    gender: 'Nữ',
                    numberphone: '0798624951',
                    email: "tester@gmail.com"
                }
                // 3. Update User Info
                chai.request(server)
                    .post('/accounts/update-userinfo')
                    .set('token', token)
                    .set('user_id', user_id)
                    .send(userUpdate)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        console.log(res.body)
                        done()
                    })
            })
    })

    it(`Should Update user-info fail with email does not exist`, (done) => {
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
                // 3. Update User Info

                var userUpdate = {
                    fullname: 'Updated User Name',
                    avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1464209883914807&height=50&width=50&ext=1632469496&hash=AeTGBFEgcStsd8NYyh8',
                    birthday: '02/09/1999',
                    address: 'Mỹ Tho',
                    gender: 'Nữ',
                    numberphone: '0798624951',
                    email: "notExist@gmail.com"
                }
                chai.request(server)
                    .post('/accounts/update-userinfo')
                    .set('token', token)
                    .set('user_id', user_id)
                    .send(userUpdate)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        console.log(res.body)
                        done()
                    })
            })
    })

    it(`Should Update user-info fail with unauthorized user`, (done) => {
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
                var user_id = res.body.id
                // 3. Update User Info
                var userUpdate = {
                    fullname: 'Updated User Name',
                    avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1464209883914807&height=50&width=50&ext=1632469496&hash=AeTGBFEgcStsd8NYyh8',
                    birthday: '02/09/1999',
                    address: 'Mỹ Tho',
                    gender: 'Nữ',
                    numberphone: '0798624951',
                    email: "tester@gmail.com"
                }
                chai.request(server)
                    .post('/accounts/update-userinfo')
                    .set('token', token)
                    .set('user_id', user_id)
                    .send(userUpdate)
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        console.log(res.body)
                        done()
                    })
            })
    })




})
