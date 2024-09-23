const express = require('express')
const dotenv = require("dotenv")
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const connectDB = require('./config/db')


// load config
dotenv.config({ path:"./config/config.env"})

connectDB()

const app = express()
 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine());
app.set('view engine', '.hbs')

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`))