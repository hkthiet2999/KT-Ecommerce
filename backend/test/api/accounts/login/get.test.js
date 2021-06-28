process.env.NODE_ENV='development' // using SalesWebsite

const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
const should = chai.should();
chai.use(chaiHttp);

describe('GET accounts/login', () =>{
    it(`Test default API welcome`, (done) =>{
        chai.request(server)
        .get('/accounts/login')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        done()
        })
    })
})
