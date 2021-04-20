const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
//req.session.loggedin = true


router.get('/',checkNotAuthenticated,(req,res)=>{
    res.render('login/index')
})


router.post('/',
passport.authenticate('local'),
  function(req,res) {
    req.session.loggedin = true,
    console.log(req.session.loggedin)
    res.redirect('/')
    
  }  
) /*, (req,res)=>{
  req.session.loggedin = true,
  console.log(req.session.loggedin)
}*/





function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.render('login/index')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
module.exports = router