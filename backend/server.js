 //console.log("Hello World")

const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')



const port = process.env.PORT || 5000

connectDB()

 
const app = express()

/*
app.get('/api/goals', (req, res) => {
    //res.send('Get Goals')   
    //res.json({message: 'Get Goals'})
    res.status(200).json({message: 'Get Goals'})
})


*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/deals', require('./routes/dealRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/customer', require('./routes/customerRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
