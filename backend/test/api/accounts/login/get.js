const server = require("../../../../index.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

// 
let should = chai.should();
chai.use(chaiHttp)

describe('TEST API: /accounts/login', () =>{

    describe('GET accounts/login', () =>{
        it(`Should return AAA`, (done) =>{
            chai.request(server)
            .get('accounts/login')
            .end((err,res) => {
            done()
            })
        })
    })
})