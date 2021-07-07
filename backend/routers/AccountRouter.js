const express = require('express');
const Router  = express.Router()
const Account = require('../models/AccountModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
//
const product = require("../models/ProductModel.js");
const user = require("../models/AccountModel.js");
//
const registerValidator = require('./validator/registerValidator')
const loginValidator = require('./validator/loginValidator')
const { validationResult } = require('express-validator')
const {authHMAC} = require('../auth/checkUser-genToken-HMAC.js')
const {authRSA} = require('../auth/checkUser-genToken-RSA.js')


/* login api */
Router.post("/login", loginValidator, (req, res) => {
    console.log(req.body)
    try {
        let result = validationResult(req)
        if(result.errors.length === 0){
            if (req.body && req.body.email && req.body.password ) {
                // console.log('--- 1. Validation Login ---')
                user.find({ email: req.body.email }, async (err, data) => {
                    // console.log('--- 2. Find email in DB---')
                    if (data.length > 0) {
                        // console.log('--- 3. Check password ---')
                        console.log('password DB:',data[0].password)
                        console.log('password User: ', req.body.password)
                        // console.log(bcrypt.compareSync(data[0].password, req.body.password))
                        // console.log(bcrypt.compare(data[0].password, req.body.password))
                        // var hashed = bcrypt.hashSync(req.body.password, salt)
                        // console.log('hased password:', hashed)
                        if (bcrypt.compareSync(req.body.password, data[0].password)) {
                            // console.log('check pass true')
                            // console.log('data: ', data[0])
                            // await authHMAC(data[0], req, res); // sign with HMAC SHA-256
                            await authRSA(data[0], req, res); // sign with RSA SHA-256
                        } else {
                            // console.log('Dô đây lỗi 1')
                            res.status(400).json({
                                errorMessage: 'Mật khẩu không chính xác!',
                                status: false
                            });
                        }
    
                    } else {
                        res.status(400).json({
                        errorMessage: 'Tài khoản email không tồn tại!',
                        status: false
                        });
                    }
                })
            } 
            //else {
            //     res.status(400).json({
            //     errorMessage: 'Bạn phải nhập đủ thông tin!',
            //     status: false
            //     });
            // }
        }
        else{
            let Messages = result.mapped()
            let errorMessage = ''
            for (m in Messages){
                errorMessage = Messages[m].msg
                break
            }
            return res.status(400).json({errorMessage: errorMessage, status: false})
        }
        //
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Lỗi hệ thống!',
            status: false
        });
    }
});
  
/* register api */
Router.post("/register", registerValidator, (req, res) => {
    console.log(req.body)
    try {
        let result = validationResult(req)
        if(result.errors.length === 0){
            if (req.body.email && req.body.password && req.body.fullname) {
                // console.log('--- 1. Validation Register ---')
                user.find({ email: req.body.email }, (err, data) => {
                    // console.log('--- 2. Find email in DB ---')
                    if (data.length == 0) {
                        // console.log('--- 3. Create new user ---')
                        const hased = bcrypt.hashSync(req.body.password, salt)
                        let User = new user({
                            fullname: req.body.fullname,
                            email: req.body.email,
                            password: hased
                        });
                        User.save((err, data) => {
                            if (err) {
                                res.status(400).json({
                                    errorMessage: err,
                                    status: false
                                });
                            } else {
                                res.status(200).json({
                                    status: true,
                                    title: 'Đăng ký tài khoản thành công'
                                });
                            }
                        });
                    } else {
                        res.status(400).json({
                            errorMessage: `Người dùng ${req.body.fullname} với email: ${req.body.email} đã tồn tại!`,
                            status: false
                        });
                    }
                });
            } else {
                res.status(400).json({
                    errorMessage: 'Bạn phải nhập đủ thông tin!',
                    status: false
                });
            }
        }
        else{
            let Messages = result.mapped()
            let errorMessage = ''
            for (m in Messages){
                errorMessage = Messages[m].msg
                break
            }
            return res.status(400).json({errorMessage: errorMessage, status: false})
        }
        
    } catch (e) {
        res.status(400).json({
        errorMessage: 'Lỗi hệ thống!',
        status: false
        });
    }
});
// register sucscess
Router.get("/login", (req, res) => {
    res.status(200).json({
      status: true,
      title: 'API for test'
    });
});
// Social
Router.post("/google-login", async (req, res) => {
    console.log('login with Google:',req.body)
    try{
        const generatePassword = req.body.email + process.env.GOOGLE_SECRET
        const hased = bcrypt.hashSync(generatePassword, salt)
        // check firtLogin?
        user.find({ email: req.body.email }, async (err, data) => {
            // console.log('--- 2. Find email in DB ---')
            if (data.length == 0) { // firtLogin = true
                let User = new user({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hased
                });
                // console.log('Pass hased:', hased)
                // console.log('User:', User)
                User.save((err, data) => {
                    if (err) {
                        res.status(400).json({
                            errorMessage: err,
                            status: false
                        });
                    } else {
                        user.find({ email: req.body.email }, async (err, data) => {
                            // console.log('--- 2. Find email in DB---')
                            if (data.length > 0) {
                                // await authHMAC(data[0], req, res); // sign with HMAC SHA-256
                                await authRSA(data[0], req, res); // sign with RSA SHA-256
                            } else {
                                res.status(400).json({
                                errorMessage: 'Tài khoản email không tồn tại!',
                                status: false
                                });
                            }
                        })

                    }
                });
            } else { // firtLogin = false
                // await authHMAC(data[0], req, res);
                await authRSA(data[0], req, res); // sign with RSA SHA-256
            }
        });
    
    } catch(e){
        res.status(400).json({
            errorMessage: 'Lỗi hệ thống!',
            status: false
        });
    }
});

Router.post("/facebook-login",(req, res)=>{
    res.status(200).json({
        status: true,
        title: 'Đăng nhập bằng Facebook'
    });
})

module.exports = Router
