require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const ProductRouter = require('./routers/ProductRouter')
const OrderRouter = require('./routers/OrderRouter')
const AccountRouter = require('./routers/AccountRouter')

//
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        code:0,
        message: 'My REST API'
    })
});

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
