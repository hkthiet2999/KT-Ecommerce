process.env.NODE_ENV='test'
const server = require("../../index")
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
    const Product = require('../../models/ProductModel')
    const Account = require('../../models/AccountModel')

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

    it(`Should add new product successful`, (done) =>{
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
            var product = {
                name: "No name",
                desc: "No description",
                price: "120000", // number
                discount: "12",
            }
            // 3. Add product
            chai.request(server)
            .post('/products/add-product')
            .set('token', token)
            .set('Content-Type','multipart/form-data')
            .type('form')
            .field("name", product.name)
            .field("desc", product.desc)
            .field("price", product.price)
            .field("discount", product.discount)
            .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
            .end((err,res) => {
                expect(res.status).to.be.equal(200);   
                expect(res.body).to.be.a('object');
                console.log(res.body)
            done()
            })
        })
    })
})