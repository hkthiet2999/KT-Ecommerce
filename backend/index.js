// require('dotenv').config()
require('dotenv-flow').config();
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
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api-docs/swagger.js');
console.log(swaggerDocument)

//
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// root
app.use("/", (req, res, next) => {
    try {
      if (req.path == "/accounts/login" || req.path == "/accounts/register" || req.path == "/api-docs" || req.path == "/") {
        next();
      } else {
        console.log('verify')
        console.log('token:', req.headers.token)
        /* decode jwt token if authorized*/
        jwt.verify(req.headers.token, JWT_SECRET, function (err, decoded) {
          // console.log('Do day 111111')
          if (decoded && decoded.user) {
            req.user = decoded;
            console.log('decoded')
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
        errorMessage: 'Lỗi hệ thống',
        status: false
      });
    }
})

app.use('/accounts', AccountRouter)
app.use('/products', ProductRouter)
// app.use('/orders', OrderRouter)

// DB
const port = process.env.PORT
// SQL SERVER
const sql = require('mssql');
const sqlconfig = require('./mssql/dbconfig.js');

sql.connect(sqlconfig).then(()=>{
  console.log('Connected to SQL Server');
})
.catch(e => console.log(`Can't connect to SQL Server: `+e.message))
// MONGO DB
// Chạy normal - URI: mongodb://localhost/SalesWebsite
// Chạy Docker compose - URI : mongodb://mongo:27017/SalesWebsite
//```````````````````````````````````````````
var mongoURI = process.env.MONGODB_URI 
mongoose.connect(mongoURI,
{ 
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(`Can't connect to MongoDB `+e.message));

//```````````````````````````````````````````


//```````````````````````````````````````````


app.listen(port, () => console.log(`Server started on port: http://localhost:` + port));

module.exports = app