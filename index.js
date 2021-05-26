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
app.use((req, res, next) => {
    req.vars = {root: __dirname}
    next()
})

const getCurrentDir = (req, res, next) => {
    if (!req.session.user) {
        // chưa đăng nhập
        return next();
    }

    const {userRoot} = req.session.user
    let {dir} = req.query
    if (dir === undefined) {
        dir = ''
    }

    let currentDir =`${userRoot}/${dir}`
    if (!fs.existsSync(currentDir)) {

        currentDir = userRoot
    }

    req.vars.currentDir = currentDir
    req.vars.userRoot = userRoot 
    next();  
}

app.get('/', getCurrentDir, (req, res) =>{
    if (!req.session.user) {
        return res.redirect('/accounts/login')
    }

    let {userRoot, currentDir} = req.vars
    // console.log('cần nạp thư mục: ' + currentDir);

    FileReader.load(userRoot, currentDir)
    .then(files => {
        
        const user = req.session.user
        res.render('index', {user, files})
    })

})

app.use('/accounts', AccountRouter)
app.use('/products', ProductRouter)
app.use('/orders', OrderRouter)

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
