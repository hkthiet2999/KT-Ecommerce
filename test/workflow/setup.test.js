process.env.NODE_ENV = 'test';

const Product = require('../../models/ProductModel');
const Account = require('../../models/AccountModel');


//clean up the database before and after each test
beforeEach((done) => { 
    Product.deleteMany({}, function(err) {});
    Account.deleteMany({}, function(err) {});
    done();
});

afterEach((done) => {
    Account.deleteMany({}, function(err) {});
    Product.deleteMany({}, function(err) {});
    done();
});

