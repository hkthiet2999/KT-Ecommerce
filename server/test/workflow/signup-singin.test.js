process.env.NODE_ENV='test'
const server = require("../../index")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
const assert = require('assert');
// const { validationResult } = require("express-validator");
chai.should();
const expect = chai.expect;
chai.use(chaiHttp)

//

//
describe('POST /accounts/register', () =>{
    const Account = require('../../models/AccountModel')

    beforeEach((done) => { 
        Account.deleteMany({}, function(err) {
            if (err) {
                console.log(err);
            }
        });
        done();
    });

    it(`Should register then login successful`, (done) =>{
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
        .end((err,res) => {
            expect(res.status).to.be.equal(200);   
            expect(res.body).to.be.a('object');

            // 2. Login
            chai.request(server)
            .post('/accounts/login')
            .send({email: "tester@gmail.com",
            password: "tester123456",})
            .end((err,res) => {
                                        
                expect(res.status).to.be.equal(200);                         
            done()
            })
        })
    })
    
})
