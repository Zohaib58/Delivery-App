const express = require('express')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


const port = process.env.PORT || 5000

connectDB()
 
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* 
For routes

app.use('/api/users', require('./routes/userRoutes'))

*/

app.use('/vapi/inventory', require('./routes/inventoryRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
