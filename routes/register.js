const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
//req.session.loggedin = true;
router.get('/',checkNotAuthenticated,(req,res)=>{
    res.render('register/index.ejs',{
      errorMessage:''
    })
})

router.post('/',checkNotAuthenticated,async (req,res)=>{
  
    try{
      
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await new User 

        newUser.userName = req.body.name,
        newUser.email = req.body.email,
        newUser.password = hashedPassword,
        newUser.mobileNumber = req.body.mobileNumber

        await newUser.save()

        res.redirect('/login')

    } catch(err){
        console.log(err)
        res.render('register/index',{
          errorMessage: 'e-mail already exists'
        })
    }
})

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