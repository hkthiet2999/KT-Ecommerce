const express = require('express')
const Router = express.Router()
const {validationResult} = require('express-validator')
const CheckLogin = require('../authorize/checkLogin')
const Product = require('../models/ProductModel')
const rateLimit = require("express-rate-limit")

const addProductValidator = require('./validator/addProductValidator')

const allProductLimiter = rateLimit({
    windowMs: 10 * 1000, //(tinh bang mili giay)
    max: 5, // start blocking after 5 requests
    message: "Khong gui qua 5 request trong 10s khi doc danh sach san pham"
})
const detailProductLimiter = rateLimit({
    windowMs: 10 * 1000, //10s
    max: 2, // start blocking after 2 requests
    message: "Khong gui qua 2 request trong 10s khi doc chi tiet 1 san pham"
})

Router.get('/', allProductLimiter, (req, res) =>{
    Product.find().select('name price desc')
    .then(products => {
        res.json({
            code: 0,
            message: 'Đọc danh sách sản phẩm thành công',
            data: products
        })
    })
})

Router.post('/', CheckLogin, addProductValidator,(req, res) => {
    let result = validationResult(req)
    if(result.errors.length === 0){
        const {name, price, desc} = req.body
        let product = new Product({
            name, price, desc
        })

        product.save()
        .then(() => {
            return res.json({code: 0, message: 'Thêm sản phẩm thành công', data: product})
        })
        .catch(e => {
            return res.json({code: 2, message: e.message})
        })
    }
    else{
        let messages = result.mapped()
        let message = ''
        for (m in messages){
            message = messages[m].msg
            break
        }
        return res.json({code: 1, message: message})
    } 
})

Router.get('/:id', detailProductLimiter, (req, res) => {
    let {id} = req.params
    if(!id) {
        return res.json({code: 1, message: 'Khong co thong tin ma san pham'})
    }
    Product.findById(id)
    .then(p => {
        if(p) {
            return res.json({code: 0, message: 'Da tim thay san pham', data: p})
        }
        else return res.json({code: 2, message: 'Khong tim thay san pham'})
    })
    .catch(e => {
        if (e.message.includes('Cast to ObjectId failed')){
            return res.json({code: 3, message: "Day khong phai la mot id hop le"})
        }
        return res.json({code: 3, message: e.message})
    })
})

Router.delete('/:id', CheckLogin, (req, res) => {
    let {id} = req.params
    if(!id) {
        return res.json({code: 1, message: 'Khong thay thong tin ma san pham'})
    }
    Product.findByIdAndDelete(id)
    .then(p => {
        if(p) {
            return res.json({code: 0, message: 'Da xoa san pham'})
        }
        else return res.json({code: 2, message: 'Khong tim thay san pham'})
    })
    .catch(e => {
        if (e.message.includes('Cast to ObjectId failed')){
            return res.json({code: 3, message: "Day khong phai la mot id hop le"})
        }
        return res.json({code: 3, message: e.message})
    })
})

Router.put('/:id', CheckLogin, (req, res) => {
    let {id} = req.params
    if(!id) {
        return res.json({code: 1, message: 'Khong thay thong tin ma san pham'})
    }

    let supportedFields = ['name', 'price', 'desc']
    let updateData = req.body
    if(!updateData){
        return res.json({code: 2, message:'Khong co du lieu can cap nhat'})
    }

    for (field in updateData){
        if(!supportedFields.includes(field)){
            delete updateData[field] //xoa cac field khong duoc ho tro
        }
    }

    Product.findByIdAndUpdate(id, updateData, {
        new: true // Update xong se tra ve data moi
    })
    .then(p => {
        if(p) {
            return res.json({code: 0, message: 'Da cap nhat san pham thanh cong', data: p})
        }
        else return res.json({code: 2, message: 'Khong tim thay san pham bang id'})
    })
    .catch(e => {
        if (e.message.includes('Cast to ObjectId failed')){
            return res.json({code: 3, message: "Day khong phai la mot id hop le"})
        }
        return res.json({code: 3, message: e.message})
    })
})

module.exports = Router