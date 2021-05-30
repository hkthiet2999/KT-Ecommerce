const express = require('express');
const Router  = express.Router()
const Account = require('../models/AccountModel')
const bcrypt = require('bcrypt')
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
Router.post("/login", (req, res) => {
    console.log(req.body)
    try {
        if (req.body && req.body.email && req.body.password ) {
            console.log('Dô đây 1')
            user.find({ email: req.body.email }, (err, data) => {
                console.log('Dô đây 2')
                if (data.length > 0) {
                    console.log('Dô đây 3')
                    console.log(data[0].password)
                    console.log(bcrypt.compareSync(data[0].password, req.body.password))
                    // console.log(bcrypt.compare(data[0].password, req.body.password))
                    if (bcrypt.compareSync(data[0].password, req.body.password)) {
                        checkUserAndGenerateToken(data[0], req, res);
                    } else {
                        console.log('Dô đây lỗi 1')
                        res.status(400).json({
                            errorMessage: 'Username or password is incorrect!',
                            status: false
                        });
                    }

                } else {
                    res.status(400).json({
                    errorMessage: 'Username or password is incorrect!',
                    status: false
                    });
                }
            })
        } else {
            res.status(400).json({
            errorMessage: 'Add proper parameter first!',
            status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
});
  
/* register api */
Router.post("/register", (req, res) => {
    console.log(req.body)
    try {
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
                                title: 'Registered Successfully.'
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        errorMessage: `User ${req.body.fullname} with email: ${req.body.email} Already Exist!`,
                        status: false
                    });
                }
            });
        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
        errorMessage: 'Something went wrong!',
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
//
const {JWT_SECRET} = process.env
function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.email, id: data._id }, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
            res.status(400).json({
                status: false,
                errorMessage: err,
        });
        } else {
            res.json({
                message: 'Login Successfully.',
                token: token,
                status: true
            });
        }
    });
}
module.exports = Router
// /* login
// */
// Router.post('/login', (req, res)=> {
//     // res.json({
//     //     code: 0,
//     //     message: 'Login Route'
//     // })
//     let result = validationResult(req)
//     if(result.errors.length === 0){
//         let {email, password} = req.body
//         let account = undefined

//         Account.findOne({email: email})
//         .then(acc => {
//             if(!acc){
//                 return res.redirect('/login')
//             }
//             account = acc
//             return bcrypt.compare(password, acc.password)
//         })
//         .then(passwordMatch => {
//             if(!passwordMatch){
//                 return res.status(401).json({code: 3, message: 'Đăng nhập thất bại, mật khẩu không chính xác'})
//                 // req.flash('error', 'Đăng nhập thất bại, mật khẩu không chính xác')
//                 // req.flash('password', password)
//                 // req.flash('email', email)
//                 // return res.redirect('/accounts/login') 
//             }
//             const {JWT_SECRET} = process.env
//             jwt.sign({
//                 email: account.email,
//                 fullname: account.fullname
//             },JWT_SECRET, {
//                 expiresIn: '1h'
//             }, (err, token) => {
//                 if(err) throw err
//                 return res.json({
//                     code: 0,
//                     message: 'Đăng nhập thành công',
//                     token: token
//                 })
//                 let user = results[0]
//                     user.userRoot = `${req.vars.root}/users/${user.email}`
//                     req.session.user = user
                    
//                     req.app.use(express.static(user.userRoot))

//                     return res.redirect('/')
//             })
//         })
//         .catch(e =>{
//             return res.status(401).json({code: 2, message: 'Đăng nhập thất bại ' + e.message})
//         })
//     }
//     else{
//         let messages = result.mapped()
//         let message = ''
//         for (m in messages){
//             message = messages[m].msg
//             break
//         }
//         // return res.json({code: 1, message: message})
//         const{email, password} = req.body
//         res.redirect('/login')
//     }
// })
// /* register

// */
// Router.post('/register', registerValidator, (req, res)=> {
//     let result = validationResult(req)
//     if(result.errors.length === 0){

//         let{email, password, fullname} = req.body
//         Account.findOne({email: email})
//         .then(acc => {
//             if(acc){
//                 throw new Error('Tài khoản này đã tồn tại (email)')
//             }
//         })
//         .then(() => bcrypt.hash(password, 10))
//         .then(hashed =>{

//             let user = new Account({
//                 email: email,
//                 password: hashed,
//                 fullname: fullname
//             })
//             return user.save();
//         })
//         .then(() =>{
//             return res.json({code: 0, message: 'Đăng ký tài khoản thành công'})
//         })
//         .catch(e =>{
//             return res.json({code: 2, message: 'Đăng ký tài khoản thất bại. '+ e.message})
//         })
           
//     }
//     else{
//         let messages = result.mapped()
//         let message = ''
//         for (m in messages){
//             message = messages[m].msg
//             break
//         }
//         return res.json({code: 1, message: message})
//     }
    
// })
// module.exports = Router

// function checkUserAndGenerateToken(data, req, res) {
//     jwt.sign({ user: data.username, id: data._id }, 'hoangkienthiet1000097742827048624951702187', { expiresIn: '1d' }, (err, token) => {
//       if (err) {
//         res.status(400).json({
//           status: false,
//           errorMessage: err,
//         });
//       } else {
//         res.json({
//           message: 'Login Successfully.',
//           token: token,
//           status: true
//         });
//       }
//     });
// }