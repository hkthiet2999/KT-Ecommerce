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
    .isLength({min: 6}).withMessage('Tên người dùng phải có ít nhất 6 ký tự')
]