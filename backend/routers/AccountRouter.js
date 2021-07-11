const express = require('express');
const Router  = express.Router()
const Account = require('../models/AccountModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
// Controllers
const accountsCtrl = require('../controllers/accountsCtrl')

// Models
const product = require("../models/ProductModel.js");
const user = require("../models/AccountModel.js");
//
const registerValidator = require('./validator/registerValidator')
const loginValidator = require('./validator/loginValidator')
const { validationResult } = require('express-validator')
const {authHMAC} = require('../auth/checkUser-genToken-HMAC.js')
const {authRSA} = require('../auth/checkUser-genToken-RSA.js')
const {verifyGoogle} = require('../auth/verifyGoogle')
const {verifyFacebook} = require('../auth/verifyFacebook')
//

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
        const tokenId = req.body.token
        const verifyPayload = await verifyGoogle(tokenId)
        // console.log('Payload:', verifyPayload)
        const {email_verified, email, name, picture} = verifyPayload
        // check verify
        if(!email_verified) return res.status(400).json({
            errorMessage: 'Người dùng chưa được xác thực!',
            status: false})
        //
        const generatePassword = email + process.env.GOOGLE_SECRET
        const hased = bcrypt.hashSync(generatePassword, salt)
        //
        const User = await user.findOne({email})
        console.log('User login with GG: ', User)
        // check firstLogin
        if(User){ // false
            // check password
            if (bcrypt.compareSync(generatePassword,User.password)) {
                // gen token
                await authRSA(User, req, res)
            } else {
                res.status(400).json({
                    errorMessage: 'Bạn đã dùng email này để đăng ký tại KT-Ecommerce!',
                    status: false
                });
            }
            //

        }else{ // true
            const newUser = new user({
                fullname: name,
                email: email,
                password: hased,
                avatar: picture
            })
            await newUser.save()
            // gen token
            await authRSA(newUser, req, res)
        }
    
    } catch(e){
        res.status(400).json({
            errorMessage: 'Lỗi hệ thống!',
            status: false
        });
    }
});

Router.post("/facebook-login", async (req, res)=>{
    console.log('login with Facebook:', req.body)
    try{
        const accessToken = req.body.token
        const userId = req.body.user_id
        const data = await verifyFacebook(accessToken, userId)
        //

        const {email, name, picture} = data
        // console.log(email, name, picture)
        //
        const generatePassword = email + process.env.FACEBOOK_SECRET
        const hased = bcrypt.hashSync(generatePassword, salt)
        //
        const User = await user.findOne({email})
        console.log(User)
        // check firstLogin
        if(User){ // false
            // check password
            if (bcrypt.compareSync(generatePassword,User.password)) {
                // gen token
                await authRSA(User, req, res)
            } else {
                res.status(400).json({
                    errorMessage: 'Bạn đã dùng email này để đăng ký tại KT-Ecommerce!',
                    status: false
                });
            }
            //
        }else{ // true
            const newUser = new user({
                fullname: name,
                email: email,
                password: hased
            })
            await newUser.save()
            // gen token
            await authRSA(newUser, req, res)
        }
    
    } catch(e){
        res.status(400).json({
            errorMessage: 'Lỗi hệ thống!',
            status: false
        });
    }
})

// forgor password
Router.post("/forgot-password", accountsCtrl.forgotPassword)
// reset password
Router.post("/reset-password", accountsCtrl.resetPassword)

// get user info
Router.get("/user-info", accountsCtrl.getUserInfo)
module.exports = Router
