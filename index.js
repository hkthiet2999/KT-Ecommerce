require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken');
//
const bcrypt = require('bcrypt')
const path = require("path")
//
const product = require("./models/ProductModel.js");
const user = require("./models/AccountModel.js");

const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer')
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
app.use(express.static(path.join(__dirname, "reactjs", "build")))
//
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "reactjs", "build", "index.html"));
});
//
app.set('view engine', 'ejs')
//
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
//
app.use("/", (req, res, next) => {
    try {
      if (req.path == "/accounts/login" || req.path == "/accounts/register" || req.path == "/") {
        next();
      } else {
        console.log('Do day 0000')
        console.log('token:', req.headers.token)
        /* decode jwt token if authorized*/
        jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
          // console.log('Do day 111111')
          console.log(decoded.foo)
          if (decoded && decoded.user) {
            req.user = decoded;
            console.log('Do day 111111')
            next();
          } else {
            return res.status(401).json({
              message: 'User unauthorized!',
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
// mongoose.connect('mongodb://localhost/SalesWebsite',{
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(port, () => {
        console.log(`Server started on port: http://localhost:` + port);
    });
})
.catch(e => console.log('Khong ket noi dc voi Database server: '+e.message))
