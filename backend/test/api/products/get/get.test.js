process.env.NODE_ENV='test'
const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")
const fs = require('fs')
// 
const assert = require('assert');
chai.should();
const expect = chai.expect;
chai.use(chaiHttp)

//

//
describe('POST /products/add-product', () =>{
    const Product = require('../../../../models/ProductModel')
    const Account = require('../../../../models/AccountModel')

    beforeEach((done) => { 
        Product.deleteMany({}, function(err) {
            if (err) {
                console.log(err);
            }
        });
        Account.deleteMany({}, function(err) {
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
        .end((err,res) => {
            expect(res.status).to.be.equal(200);   
            expect(res.body).to.be.a('object');
            done()
        })
        
    })

    //////////////////

    it(`Should get no product for sale`, (done) =>{
        // 2. Login
        chai.request(server)
        .post('/accounts/login')
        .send({email: "tester@gmail.com",password: "tester123456",})
        .end((err,res) => {            
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            res.body.should.have.property('token')
            var token = res.body.token
            // var token = 'some_authorization_token'
            // console.log('token:', token)

            // code here
            // /get-product
            chai.request(server)
            .get('/products/get-product')
            .set('token', token)
            .set('Content-Type','multipart/form-data')
            .end((err,res) => {
                expect(res.status).to.be.equal(400);   
                expect(res.body).to.be.a('object');
                console.log(res.body)
            done()
            })
        })
    })
})