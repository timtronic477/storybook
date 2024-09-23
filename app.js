const path = require('path')
const express = require('express')
const dotenv = require("dotenv")
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const connectDB = require('./config/db')
const passport = require('passport')
const session = require("express-session")


// load config
dotenv.config({ path:"./config/config.env"})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()
 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine());
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`))