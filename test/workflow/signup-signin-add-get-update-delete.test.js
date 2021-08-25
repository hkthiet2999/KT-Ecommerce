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

    it(`Should register then login with the account, then add new three products, get all products then update product 03 and delete product 02 #successful`, (done) =>{
        // 2. Login
        chai.request(server)
        .post('/accounts/login')
        .send({email: "tester@gmail.com",password: "tester123456",})
        .end((err,res) => {            
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            res.body.should.have.property('token')
            var token = res.body.token

            // 3. Add 3 products
            // 3.1 Product 1
            var product01 = {
                name: "Product 01",
                desc: "No description",
                price: "120000", // number
                discount: "6",
            }
            chai.request(server)
            .post('/products/add-product')
            .set('token', token)
            .set('Content-Type','multipart/form-data')
            .type('form')
            .field("name", product01.name)
            .field("desc", product01.desc)
            .field("price", product01.price)
            .field("discount", product01.discount)
            .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
            .end((err,res) => {
                expect(res.status).to.be.equal(200);   
                expect(res.body).to.be.a('object');
                // console.log(res.body)

                // 3.2 Product 2
                var product02 = {
                    name: "Product 02",
                    desc: "No description",
                    price: "900000", // number
                    discount: "9",
                }
                chai.request(server)
                .post('/products/add-product')
                .set('token', token)
                .set('Content-Type','multipart/form-data')
                .type('form')
                .field("name", product02.name)
                .field("desc", product02.desc)
                .field("price", product02.price)
                .field("discount", product02.discount)
                .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                .end((err,res) => {
                    expect(res.status).to.be.equal(200);   
                    expect(res.body).to.be.a('object');
                    // console.log(res.body)
                    
                    // 3.3 Product 03
                    var product03 = {
                        name: "Product 03",
                        desc: "No description",
                        price: "300000", // number
                        discount: "0",
                    }
                    chai.request(server)
                    .post('/products/add-product')
                    .set('token', token)
                    .set('Content-Type','multipart/form-data')
                    .type('form')
                    .field("name", product03.name)
                    .field("desc", product03.desc)
                    .field("price", product03.price)
                    .field("discount", product03.discount)
                    .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                    .end((err,res) => {
                        expect(res.status).to.be.equal(200);   
                        expect(res.body).to.be.a('object');
                        // console.log(res.body)
                        

                        chai.request(server)
                        .get('/products/get-product')
                        .set('token', token)
                        .set('Content-Type','multipart/form-data')
                        .end((err,res) => {
                            expect(res.status).to.be.equal(200);   
                            expect(res.body).to.be.a('object');
                            console.log('--- When not deleted ---\n',res.body)
                            
                            // 4. Get products
                            // 
                            chai.request(server)
                            .get('/products/get-product')
                            .set('token', token)
                            .set('Content-Type','multipart/form-data')
                            .end((err,res) => {
                                expect(res.status).to.be.equal(200);   
                                expect(res.body).to.be.a('object');
                                console.log(res.body)

                                // 5. Update product 03
                                var _id = res.body.products[2]._id
                                // console.log('id: ', _id)
                                var product_updated = {
                                    name: "Product 03 - Updated",
                                    desc: "Updated description",
                                    price: "999999", // number
                                    discount: "0",
                                }
                                chai.request(server)
                                .post('/products/update-product')
                                .set('token', token)
                                .set('Content-Type','multipart/form-data')
                                .type('form')
                                .field("id", _id) // must
                                .field("name", product_updated.name)
                                .field("desc", product_updated.desc)
                                .field("price", product_updated.price)
                                .field("discount", product_updated.discount)
                                .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                                .end((err,res) => {
                                    expect(res.status).to.be.equal(200);   
                                    expect(res.body).to.be.a('object');
                                    console.log(res.body)
                                    // check by get all products to see updated
                                    chai.request(server)
                                    .get('/products/get-product')
                                    .set('token', token)
                                    .set('Content-Type','multipart/form-data')
                                    .end((err,res) => {
                                        expect(res.status).to.be.equal(200);   
                                        expect(res.body).to.be.a('object');
                                        console.log('--- When updated ---\n',res.body)
                                        
                                        // 6. Delete product 02
                                        var _id = res.body.products[1]._id
                                        var id = { id: _id} // parse to json
                                        // console.log('_id: ',_id)
                                        // console.log('id: ', id) 

                                        chai.request(server)
                                        .post('/products/delete-product')
                                        .set('token', token)
                                        .set('Content-Type','application/json')
                                        .send(id)
                                        .end((err,res) => {
                                            expect(res.status).to.be.equal(200);   
                                            expect(res.body).to.be.a('object');
                                            console.log(res.body)
                                            // check by get all products to see deleted
                                            chai.request(server)
                                            .get('/products/get-product')
                                            .set('token', token)
                                            .set('Content-Type','multipart/form-data')
                                            .end((err,res) => {
                                                expect(res.status).to.be.equal(200);   
                                                expect(res.body).to.be.a('object');
                                                console.log('--- When deleted ---\n',res.body)
                                                done()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})