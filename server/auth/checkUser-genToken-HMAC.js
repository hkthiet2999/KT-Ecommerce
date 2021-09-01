// sign with HMAC SHA-256
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
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
                title: 'Đăng nhập thành công!! Chào mừng bạn đến với KT.vn'
            });
        }
    });
}
module.exports = {authHMAC: checkUserAndGenerateToken}