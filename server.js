
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverRide = require('method-override')
const User = require('./models/user')
const initializePassport = require('./config/passport')

initializePassport(
    passport,
    email => user.find(user=>user.email === email),
    id => user.find(user=>user.id === id)
)


app.use(flash())
app.use(session({
    secret: 'something',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverRide('_method'))


app.use('*',function (req, res, next) {
    res.locals.session = req.session;
    next();
})

app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))







const contactUsRoute = require('./routes/contactUs')
const indexRouter = require('./routes/index')
const createRouter = require('./routes/create')
const myridesRouter = require('./routes/myrides')
const findRouter = require('./routes/find')
const loginRouter = require('./routes/login')
const registerRoute = require('./routes/register')



app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended: true}))

const mongoose = require('mongoose')
const { rawListeners } = require('./models/user')
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://admin-santhosh:QZWSOhEc09xLL7uq@cluster0.hbwew.mongodb.net/project',{ useUnifiedTopology: true,useNewUrlParser :true}) 
mongoose.set('useCreateIndex', true);
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('Connected to database'))




app.use('/',indexRouter)
app.use('/create',createRouter)
app.use('/myrides',myridesRouter)
app.use('/find',findRouter)
app.use('/login',loginRouter)
app.use('/register',registerRoute)
app.use('/contactUs',contactUsRoute)


app.delete('/logout',(req,res)=>{
    req.session.loggedin = false,
    req.logOut(),
    res.redirect('/login')
})





app.listen(process.env.PORT || 3100)
