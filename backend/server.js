 //console.log("Hello World")
const enum1 = require('./enum/orderEnum')
const enum2 = require('./enum/paymentEnum')
const enum3 = require('./enum/roleEnum')
const enum4 = require('./enum/statusEnum');
const category = require('./models/categoryModel')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors');



const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


const app = express()
app.use(cors());

const port = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/vapi/inventory', require('./routes/inventoryRoutes'))
app.use('/vapi/orders', require('./routes/vendorOrderRoutes'))


app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/deals', require('./routes/dealRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/customer', require('./routes/customerRoutes'))

app.use('/sapi/categories', require('./routes/categoryRoutes'))
app.use('/vapi/vendors', require("./routes/vendorRoutes"))



app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
