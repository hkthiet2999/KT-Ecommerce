require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken');
//
const bcrypt = require('bcrypt')
const path = require("path")
// //
const product = require("./models/ProductModel.js");
const user = require("./models/AccountModel.js");
const {JWT_SECRET} = process.env
// swagger
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Documents',
      version: '1.0.0'
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'token',
        scheme: 'bearer',
        in: 'header',
      },
    }
  },
  apis: ['index.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
console.log(swaggerDocs)

//
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const fs = require('fs')
// const multer = require('multer')
// const FileReader = require('./fileReader')
// const multer = require('multer')
//
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); 
app.use(cookieParser('hkthiet99'));
app.use(session({ cookie: { maxAge: 600000 }}));
app.use(flash());
//
const ProductRouter = require('./routers/ProductRouter')
const OrderRouter = require('./routers/OrderRouter')
const AccountRouter = require('./routers/AccountRouter')
//
// app.use(express.static(path.resolve(__dirname, "./reactjs/build")))
// //
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./reactjs/public", "index.html"));
// });
//
app.set('view engine', 'ejs')
//
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
// API DOCUMENTS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


/**
 * @swagger
 * /accounts/login:
 *   post:
 *     description: Gửi thông tin người dùng đăng nhập
 *     parameters:
 *        - in: body
 *          name: user
 *          description: Người dùng gửi thông tin đăng nhập
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *        200:
 *          description: Đăng nhập thành công sẽ chuyển đến Home Page
 *   get:
 *     description: Trả về thông báo đăng nhập thành công
 *     responses:
 *       200:
 *         description: Đã đăng nhập thành công
 * 
 * /accounts/register:
 *   post:
 *     description: Gửi thông tin người dùng đăng ký tài khoản mới
 *     parameters:
 *        - in: body
 *          name: user
 *          description: Người dùng gửi thông tin đăng ký
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              fullname: 
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              confirm_password:
 *                type: string
 *     responses:
 *        200:
 *          description: Đăng ký thành công sẽ chuyển đến Login Page
 *
 * /products/add-product:
 *   post:
 *     description: Gửi thông tin sản phẩm cần thêm
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *        - in: body
 *          name: product
 *          description: Người dùng gửi thông tin sản phẩm cần thêm
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *              desc:
 *                type: string
 *              price:
 *                type: number
 *              discount:
 *                type: number
 *              files:
 *                type: string
 *     responses:
 *        200:
 *          description: Thêm thông tin sản phẩm thành công
 * 
 * /products/get-product:
 *   get:
 *     description: Trả về thông tin sản phẩm cần thêm
 *     responses:
 *        200:
 *          description: Trả về thông tin sản phẩm
 *        400:
 *          description: Trả về thông báo chưa có sản phẩm nào để bán
 *
 * /products/update-product:
 *   post:
 *     description: Gửi thông tin sản phẩm cần cập nhật
 *     parameters:
 *        - in: body
 *          name: product
 *          description: Người dùng gửi thông tin sản phẩm cần cập nhật
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *              desc:
 *                type: string
 *              price:
 *                type: number
 *              discount:
 *                type: number
 *              files:
 *                type: string
 *     responses:
 *        200:
 *          description: Cập nhật thông tin sản phẩm thành công
 * 
 * /products/delete-product:
 *   post:
 *     description: Gửi thông tin sản phẩm cần xóa
 *     parameters:
 *        - in: body
 *          name: product
 *          description: Người dùng gửi thông tin sản phẩm cần xóa
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              desc:
 *                type: string
 *              price:
 *                type: number
 *              discount:
 *                type: number
 *              files:
 *                type: string
 *                  
 *     responses:
 *        200:
 *          description: Xóa sản phẩm thành công
 * */
//
app.use("/", (req, res, next) => {
    try {
      if (req.path == "/accounts/login" || req.path == "/accounts/register" || req.path == "/") {
        next();
      } else {
        console.log('Do day 0000')
        console.log('token:', req.headers.token)
        /* decode jwt token if authorized*/
        jwt.verify(req.headers.token, JWT_SECRET, function (err, decoded) {
          // console.log('Do day 111111')
          if (decoded && decoded.user) {
            req.user = decoded;
            console.log('Do day 111111')
            next();
          } else {
            return res.status(401).json({
              message: 'Người dùng chưa được xác thực!',
              status: false
            });
          }
        })
      }
    } catch (e) {

      res.status(400).json({
        errorMessage: '?????',
        status: false
      });
    }
})

app.use('/accounts', AccountRouter)
app.use('/products', ProductRouter)
// app.use('/orders', OrderRouter)

// DB
const port = process.env.PORT || 8080

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// mongoose.connect(process.env.MONGODB_URI,{

mongoose.connect('mongodb://localhost/SalesWebsite',{
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(port, () => {
        console.log(`Server started on port: http://localhost:` + port);
    });
})
.catch(e => console.log('Khong ket noi dc voi Database server: '+e.message))

//```````````````````````````````````````````

// mongoose
//   .connect(
//     'mongodb://mongo:27017/SalesWebsite',
//     { 
//       useNewUrlParser: true,
//       useFindAndModify: true,
//       useUnifiedTopology: true}
//   )
//   .then(() => console.log('Ket noi MongoDB THANH CONG'))
//   .catch(e => console.log('Khong ket noi dc voi Database server: '+e.message));
// app.listen(port, () => console.log('Server running...'));
