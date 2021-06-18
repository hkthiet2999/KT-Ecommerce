const {check} = require('express-validator')

module.exports = [
    check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Địa chỉ email không được để trống')
    .isEmail().withMessage('Địa chỉ email không hợp lệ'),

    check('password')
    .exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Mật khẩu không được để trống')
    .isLength({min: 6}).withMessage('Mật khẩu phải có tối thiểu 6 ký tự'),

    check('fullname')
    .exists().withMessage('Vui lòng nhập tên người dùng')
    .notEmpty().withMessage('Tên người dùng không được để trống')
    .isLength({min: 6}).withMessage('Tên người dùng phải có ít nhất 6 ký tự'),

    check('confirm_password')
    .exists().withMessage('Vui lòng xác nhận lại mật khẩu')
    .notEmpty().withMessage('Mật khẩu xác nhận không được để trống')
    .isLength({min: 6}).withMessage('Mật khẩu phải có tối thiểu 6 ký tự')
    .custom( async(confirm_password, {req}) => {
        const password = req.body.password
  
        // If password and confirm password not same
        // don't allow to sign up and throw error
        if(password !== confirm_password){
            throw new Error('Mật khẩu xác nhận không khớp!')
        }
    }),

]