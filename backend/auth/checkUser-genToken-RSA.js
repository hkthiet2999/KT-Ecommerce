// sign with RSA SHA256

const jwt = require('jsonwebtoken')
const {generateKeyPair} = require('../auth/keys/generateKeyPair')
const fs = require('fs')


async function checkUserAndGenerateToken(data, req, res) {
    await generateKeyPair;
    var privateKey = fs.readFileSync('./auth/keys/private.pem', 'utf-8')
    // console.log(privateKey)
    var jwt = require("jsonwebtoken");

    var signOptions = {
      issuer: "hkthiet99",
      subject: "hkthiet99@gmail.com",
      audience: "https://github.com/smoothkt4951",
      expiresIn: "1d",
      algorithm: "RS256",
    };

    // jwt.sign(payload, privateKey, signOptions)
    jwt.sign({ user: data.email, id: data._id }, { key: privateKey, passphrase: 'top secrect' }, signOptions, (err, token) => {
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
module.exports = {authRSA: checkUserAndGenerateToken}