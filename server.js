const express = require('express')
const {errorHandler} = require('./backend/middleware/errorMiddleware')
const connectDB = require('./backend/config/db')


const port = process.env.PORT || 5000

connectDB()
 
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* 
For routes

app.use('/api/users', require('./routes/userRoutes'))

*/

app.use('/vapi/inventory', require('./backend/routes/inventoryRoutes'))
app.use('/api/products', require('./backend/routes/productRoutes'))
app.use('/api/orders', require('./backend/routes/orderRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
