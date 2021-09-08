process.env.NODE_ENV = 'test'
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
describe('POST /products/detail-product', () => {
    const Product = require('../../../../models/ProductModel')
    const Account = require('../../../../models/AccountModel')

    beforeEach((done) => {
        Product.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            }
        });
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

    //////////////////
    it(`Should Get detail product fail with unauthorized user`, (done) => {
        // 2. without Login
        // 3. Get product
        chai.request(server)
            .post('/products/detail-product')
            .set('token', 'fake_token')
            .set('Content-Type', 'multipart/form-data')
            .end((err, res) => {
                expect(res.status).to.be.equal(401);
                expect(res.body).to.be.a('object');
                console.log(res.body)
                done()
            })
    })

    it(`Should Get Detail Product sucessful`, (done) => {
        // 2. Login
        chai.request(server)
            .post('/accounts/login')
            .send({ email: "tester@gmail.com", password: "tester123456", })
            .end((err, res) => {
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
                    .set('Content-Type', 'multipart/form-data')
                    .type('form')
                    .field("name", product01.name)
                    .field("desc", product01.desc)
                    .field("price", product01.price)
                    .field("discount", product01.discount)
                    .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('object');
                        console.log(res.body)

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
                            .set('Content-Type', 'multipart/form-data')
                            .type('form')
                            .field("name", product02.name)
                            .field("desc", product02.desc)
                            .field("price", product02.price)
                            .field("discount", product02.discount)
                            .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                            .end((err, res) => {
                                expect(res.status).to.be.equal(200);
                                expect(res.body).to.be.a('object');
                                console.log(res.body)

                                // 3.3 Product 3
                                var product03 = {
                                    name: "Product 03",
                                    desc: "No description",
                                    price: "300000", // number
                                    discount: "0",
                                }
                                chai.request(server)
                                    .post('/products/add-product')
                                    .set('token', token)
                                    .set('Content-Type', 'multipart/form-data')
                                    .type('form')
                                    .field("name", product03.name)
                                    .field("desc", product03.desc)
                                    .field("price", product03.price)
                                    .field("discount", product03.discount)
                                    .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                                    .end((err, res) => {
                                        expect(res.status).to.be.equal(200);
                                        expect(res.body).to.be.a('object');
                                        console.log(res.body)

                                        // 4. Get products
                                        // 
                                        chai.request(server)
                                            .get('/products/getAll-product')
                                            .set('token', token)
                                            .end((err, res) => {
                                                expect(res.status).to.be.equal(200);
                                                expect(res.body).to.be.a('object');
                                                console.log(res.body)
                                                // Get Detail Product
                                                var product_id = res.body.products[0]._id
                                                var id = { id: product_id }
                                                // console.log('PRODUCT ID', product_id)
                                                chai.request(server)
                                                    .post('/products/detail-product')
                                                    .set('token', token)
                                                    .send(id)
                                                    .end((err, res) => {
                                                        expect(res.status).to.be.equal(200);
                                                        expect(res.body).to.be.a('object');
                                                        console.log(res.body)
                                                        done()
                                                    })
                                            })
                                    })

                            })
                    })
            })
    })


    it(`Should Get Detail Product fail with product does not exist`, (done) => {
        // 2. Login
        chai.request(server)
            .post('/accounts/login')
            .send({ email: "tester@gmail.com", password: "tester123456", })
            .end((err, res) => {
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
                    .set('Content-Type', 'multipart/form-data')
                    .type('form')
                    .field("name", product01.name)
                    .field("desc", product01.desc)
                    .field("price", product01.price)
                    .field("discount", product01.discount)
                    .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('object');
                        console.log(res.body)

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
                            .set('Content-Type', 'multipart/form-data')
                            .type('form')
                            .field("name", product02.name)
                            .field("desc", product02.desc)
                            .field("price", product02.price)
                            .field("discount", product02.discount)
                            .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                            .end((err, res) => {
                                expect(res.status).to.be.equal(200);
                                expect(res.body).to.be.a('object');
                                console.log(res.body)

                                // 3.3 Product 3
                                var product03 = {
                                    name: "Product 03",
                                    desc: "No description",
                                    price: "300000", // number
                                    discount: "0",
                                }
                                chai.request(server)
                                    .post('/products/add-product')
                                    .set('token', token)
                                    .set('Content-Type', 'multipart/form-data')
                                    .type('form')
                                    .field("name", product03.name)
                                    .field("desc", product03.desc)
                                    .field("price", product03.price)
                                    .field("discount", product03.discount)
                                    .attach('files', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
                                    .end((err, res) => {
                                        expect(res.status).to.be.equal(200);
                                        expect(res.body).to.be.a('object');
                                        console.log(res.body)

                                        // 4. Get products
                                        // 
                                        chai.request(server)
                                            .get('/products/getAll-product')
                                            .set('token', token)
                                            .end((err, res) => {
                                                expect(res.status).to.be.equal(200);
                                                expect(res.body).to.be.a('object');
                                                console.log(res.body)
                                                // Get Detail Product
                                                // var product_id = res.body.products[0]._id
                                                var id = { id: 'fake-product-id' }
                                                // console.log('PRODUCT ID', product_id)
                                                chai.request(server)
                                                    .post('/products/detail-product')
                                                    .set('token', token)
                                                    .send(id)
                                                    .end((err, res) => {
                                                        expect(res.status).to.be.equal(400);
                                                        expect(res.body).to.be.a('object');
                                                        console.log(res.body)
                                                        done()
                                                    })
                                            })
                                    })

                            })
                    })
            })
    })


})