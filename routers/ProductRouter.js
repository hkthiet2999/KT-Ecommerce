const express = require('express')
const Router = express.Router()
const {validationResult} = require('express-validator')
const CheckLogin = require('../authorize/checkLogin')

const rateLimit = require("express-rate-limit")
const multer = require('multer')
const addProductValidator = require('./validator/addProductValidator')
const { contextsKey } = require('express-validator/src/base')
const path = require('path');

const fs = require('fs')
const product = require("../models/ProductModel.js");
const user = require("../models/AccountModel.js");

// const allProductLimiter = rateLimit({
//     windowMs: 10 * 1000, //(tinh bang mili giay)
//     max: 5, // start blocking after 5 requests
//     message: "Khong gui qua 5 request trong 10s khi doc danh sach san pham"
// })
// const detailProductLimiter = rateLimit({
//     windowMs: 10 * 1000, //10s
//     max: 2, // start blocking after 2 requests
//     message: "Khong gui qua 2 request trong 10s khi doc chi tiet 1 san pham"
// })
const {JWT_SECRET} = process.env
const dir = '../uploads';
const upload = multer({
  storage: multer.diskStorage({

    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, '../uploads');
    },
    filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(/*res.end('Chỉ cho phép tải tập tin ảnh hehe')*/ null, false)
    }
    callback(null, true)
  }
});
/* Api to add Product */
Router.post("/add-product", upload.any(), (req, res) => {
    console.log('Do day 0')
    try {
      if (req.files && req.body && req.body.name && req.body.desc && req.body.price &&
        req.body.discount) {
  
        let new_product = new product();
        new_product.name = req.body.name;
        new_product.desc = req.body.desc;
        new_product.price = req.body.price;
        new_product.image = req.files[0].filename;
        new_product.discount = req.body.discount;
        new_product.user_id = req.user.id;
        new_product.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false
            });
          } else {
            res.status(200).json({
              status: true,
              title: 'Thêm sản phẩm thành công'
            });
          }
        });
  
      } else {
        res.status(400).json({
          errorMessage: 'Bạn phải nhập đủ thông tin',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Có gì đó sai sai ở đây',
        status: false
      });
    }
  });
/*Api to get and search product with pagination and search by name*/
Router.get("/get-product", (req, res) => {
  
  try {
    var query = {};
    query["$and"] = [];
    query["$and"].push({
      is_delete: false,
      user_id: req.user.id
    });
    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search }
      });
    }
    var perPage = 5;
    var page = req.query.page || 1;
    product.find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
      .skip((perPage * page) - perPage).limit(perPage)
      .then((data) => {
        product.find(query).count()
          .then((count) => {

            if (data && data.length > 0) {
              res.status(200).json({
                status: true,
                title: 'Nè',
                products: data,
                current_page: page,
                total: count,
                pages: Math.ceil(count / perPage),
              });
            } else {
              res.status(400).json({
                errorMessage: 'Bạn chưa có sản phẩm nào để bán',
                status: false
              });
            }

          });

      }).catch(err => {
        res.status(400).json({
          errorMessage: err.message || err,
          status: false
        });
      });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Có gì đó sai saiiiiii',
      status: false
    });
  }

});

module.exports = Router