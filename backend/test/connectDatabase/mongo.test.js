process.env.NODE_ENV = 'test';
const server = require("../../index")
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp);
const mongoose = require('mongoose')


describe('Access to MongoDB', function(){
    it('Should connect to MongoDB sucsessful', (done) =>{
        
        chai.request(server)
        connect_to_mongo = require('../../adapter/mongoose')
        connect_to_mongo
        done()

    });

    it('Should connect to MongoDB fail with incorect ip host', (done) =>{
        chai.request(server)
        connect_to_mongo = require('../../adapter/mongoose')
        connect_to_mongo
        done()

        
    });
});