const express = require('express');
const Router  = express.Router()
const Account = require('../models/AccountModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')
const fs = require('fs')
//
const product = require("../models/ProductModel.js");
const user = require("../models/AccountModel.js");
//
const registerValidator = require('./validator/registerValidator')
const loginValidator = require('./validator/loginValidator')
const { validationResult } = require('express-validator')
// Router.get('/login', (req, res) => {
//     res.json({
//         code: 0,
//         message: 'Đăng nhập bị lỗi gì rồi'
//     })
// })
/* login api */
Router.post("/login", loginValidator, (req, res) => {
    console.log(req.body)
    try {
        let result = validationResult(req)
        if(result.errors.length === 0){
            if (req.body && req.body.email && req.body.password ) {
                console.log('Dô đây 1')
                user.find({ email: req.body.email }, (err, data) => {
                    console.log('Dô đây 2')
                    if (data.length > 0) {
                        console.log('Dô đây 3')
                        console.log(data[0].password)
                        // console.log(bcrypt.compareSync(data[0].password, req.body.password))
                        // console.log(bcrypt.compare(data[0].password, req.body.password))
                        var hashed = bcrypt.hashSync(req.body.password, salt)
                        console.log('hased pass:', hashed)
                        if (bcrypt.compareSync(data[0].password, hashed)) {
                            
                            checkUserAndGenerateToken(data[0], req, res);
                        } else {
                            console.log('Dô đây lỗi 1')
                            res.status(400).json({
                                errorMessage: 'Tài khoản hoặc mật khẩu không chính xác!',
                                status: false
                            });
                        }
    
                    } else {
                        res.status(400).json({
                        errorMessage: 'Tài khoản hoặc mật khẩu không chính xác!',
                        status: false
                        });
                    }
                })
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
        //
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Có gì đó sai sai ở đây!',
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
                console.log('Do day')
                user.find({ email: req.body.email }, (err, data) => {
                    console.log('Do day 2')
                    if (data.length == 0) {
                        console.log('Do day 3')
                        let User = new user({
                            fullname: req.body.fullname,
                            email: req.body.email,
                            password: req.body.password
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
        errorMessage: 'Có gì đó sai sai ở đây!',
        status: false
        });
    }
});
// register sucscess
Router.get("/login", (req, res) => {
    res.status(200).json({
      status: true,
      title: 'Ngon rồi'
    });
  });
// shhhhh11111
const {JWT_SECRET} = process.env
function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.email, id: data._id }, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
            res.status(400).json({
                status: false,
                errorMessage: err,
        });
        } else {
            res.status(200).json({
                status: true,
                token: token,
                title: 'Đăng nhập thành công!! Chào mừng bạn đến với KT.vn Website E-commerce hàng đầu tại VN :v'
            });
            // res.json({
            //     message: 'Đăng nhập thành công',
            //     token: token,
            //     status: true
            // });
        }
    });
}
module.exports = Router
