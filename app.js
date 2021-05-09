require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressValidator = require('express-validator')

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))

app.use(cors())
//middleware
app.use(morgan("dev"))
//pass user credintials as a cookie
app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressValidator())

//routes
require('./routes/user')(app)
// require('./routes/user-orders')(app)
require('./routes/film')(app)
require('./routes/category')(app)



const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`)
})
