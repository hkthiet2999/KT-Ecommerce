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
describe('POST /products/delete-product', () =>{
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

    it(`Should delete Product 02 sucessful`, (done) =>{
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

                            // 5. Delete product 02
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

    // failed case

    it(`Should delete Product failed with incorect ID`, (done) =>{
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
                            // console.log('--- When not updated ---\n',res.body)

                            // 5. Delete product 02
                            // var _id = res.body.products[1]._id
                            // var _id = `fake_id`
                            var fake_product = {
                                "_id": {
                                  "$oid": "fake_id"
                                },
                                "is_delete": false,
                                "date": {
                                  "$date": "2021-06-30T03:38:56.631Z"
                                },
                                "name": "Product 01",
                                "desc": "No description",
                                "price": 120000,
                                "image": "files-1625024336611.jpg",
                                "discount": 6,
                                "user_id": {
                                  "$oid": "60dbe750af26c525bc934c2d"
                                },
                                "__v": 0
                              }
                            // console.log('_id: ',_id)
                            // console.log('id: ', id) 

                            chai.request(server)
                            .post('/products/delete-product')
                            .set('token', token)
                            .set('Content-Type','application/json')
                            .send(fake_product)
                            .end((err,res) => {
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