require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
//

const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
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
        /* decode jwt token if authorized*/
        jwt.verify(req.headers.token, 'hoangkienthiet1000097742827048624951702187', function (err, decoded) {
          if (decoded && decoded.user) {
            req.user = decoded;
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
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
})

app.use('/accounts', AccountRouter)
// app.use('/products', ProductRouter)
// app.use('/orders', OrderRouter)

// DB
const port = process.env.PORT || 8080
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
