// require('dotenv').config()
require('dotenv-flow').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const fs = require('fs')
//
const bcrypt = require('bcrypt')
const path = require("path")
// //
const product = require("./models/ProductModel.js");
const user = require("./models/AccountModel.js");
const JWT_SECRET = process.env.JWT_SECRET
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
const AccountRouter = require('./routers/AccountRouter')
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
    if (req.path == "/accounts/login" || req.path == "/accounts/register" || req.path == "/api-docs" || 
    req.path == "/" || req.path == "/accounts/google-login" || req.path == "/accounts/facebook-login" || 
    req.path == "/accounts/forgot-password" || req.path == "/accounts/reset-password") {
      next();
    } else if( req.path == "/products/add-product" ||  req.path == "/products/get-product" ||  
    req.path == "/products/update-product" ||  req.path == "/products/delete-product" || req.path == "/products/getAll-product"
    || req.path == "/accounts/user-info" || req.path == "/accounts/update-userinfo") {
      // console.log('verify')
      console.log('token:', req.headers.token)

      /* ------------------------------------------------------------------------------------------ */
      /* decode jwt token if sign with HMAC SHA-256*/
      
      // jwt.verify(req.headers.token, JWT_SECRET, function (err, decoded) {
      //   if (decoded && decoded.user) {
      //     req.user = decoded;
      //     console.log('decoded')
      //     next();
      //   } else {
      //     return res.status(401).json({message: 'Người dùng chưa được xác thực!',status: false});
      //   }
      // })

      /* ------------------------------------------------------------------------------------------ */

      /* ------------------------------------------------------------------------------------------ */
      /* decode jwt token if sign with RSA SHA-256*/

      const publicKey = fs.readFileSync('./auth/keys/public.pem', 'utf-8')
      toBeVerified = {
        complete: true,
      };
      // console.log(publicKey)
      jwt.verify(req.headers.token, publicKey, toBeVerified, (err, decoded) => {
        // console.log(decoded)
        // console.log(decoded.payload.user)
        // console.log(req.user)
        if (decoded && decoded.payload.user) {
          req.user = decoded.payload;
          // console.log('decoded')
          // console.log(req.user)
          next();
        } else {
          return res.status(401).json({message: 'Người dùng chưa được xác thực!',status: false});
        }
      })

      /* ------------------------------------------------------------------------------------------ */
    } else {
      return res.status(400).json({message: 'Liên kết chưa được hỗ trợ!',status: false});
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

// DB
// SQL SERVER
// const sql = require('mssql');
// const sqlconfig = require('./mssql/dbconfig.js');

// sql.connect(sqlconfig).then(()=>{
//   console.log('Connected to SQL Server');
// })
// .catch(e => console.log(`Can't connect to SQL Server: `+e.message))
// MONGO DB
// Chạy normal - URI: mongodb://localhost/SalesWebsite
// Chạy Docker compose - URI : mongodb://mongo:27017/SalesWebsite
//```````````````````````````````````````````
// var mongoURI = process.env.MONGODB_URI 
// mongoose.connect(mongoURI,
// { 
//   useNewUrlParser: true,
//   useFindAndModify: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(e => console.log(`Can't connect to MongoDB `+e.message));
const connect_to_mongo = require('./adapter/mongoose');
const connect_to_mssql = require('./adapter/mssql')
//```````````````````````````````````````````
function connectDatabase(){
  connect_to_mongo
  connect_to_mssql
}

//```````````````````````````````````````````

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server started on port: http://localhost:` + port)  
  connectDatabase()
});

module.exports = app