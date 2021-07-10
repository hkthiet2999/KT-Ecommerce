const user = require("../models/AccountModel");
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const {CLIENT_URL} = process.env
const axios = require('axios')
const accountsCtrl = {
    resetPassword: async (req, res) => {
        try {
            
            const {email, password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, salt)
            await user.findOneAndUpdate({email}, {
                password: passwordHash
            })
            res.status(200).json({
                title: 'Đổi mật khẩu thành công',
                status: true
            });

        } catch (err) {
            return res.status(400).json({
                errorMessage: 'Lỗi hệ thống!',
                status: false
            });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            console.log('email:', email)
            const User = await user.findOne({email})
            if(!User){
                return res.status(400).json({
                    errorMessage: 'Email này không tồn tại!',
                    status: false
                });
            }

            // const access_token = createAccessToken({id: User._id})
            const url = `${CLIENT_URL}/accounts/login`
            const randomPassword = await Math.random().toString(36).slice(-8)

            const passwordHash = await bcrypt.hash(randomPassword, salt)
            console.log('passwordHash', passwordHash)
            await user.findOneAndUpdate({email}, {
                password: passwordHash
            })

            sendMail(email, url, randomPassword, "Quay về trang Đăng nhập")
            res.status(200).json({
                title: 'Mật khẩu mới đã được gửi đến email của bạn!',
                status: true
            });

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}
module.exports = accountsCtrl