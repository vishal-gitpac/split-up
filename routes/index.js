const express = require('express')
const app = express()
const Ride = require('../models/rides')
const router = express.Router()


    router.get('/',async (req,res)=>{
        
        const searchOptions={}
        if(req.query.date != null && req.query.date !== ''){
            searchOptions.date = req.query.date
        }
        if(req.query.pickupPoint != null && req.query.pickupPoint !== ''){
            searchOptions.pickupPoint = new RegExp(req.query.pickupPoint, 'i')
        }
        if(req.query.dropoffPoint != null && req.query.dropoffPoint !== ''){
            searchOptions.dropoffPoint = new RegExp(req.query.dropoffPoint, 'i')
        }
       
        searchOptions.status = true
        //searchOptions.noOfPassengers = {$gt : 0}
        searchOptions.filled = false
        
        try{
            const myRide = await Ride.find(searchOptions).sort({createdAt: 'desc'})
            
            res.render('index',{
                myRide:myRide,
                searchOptions:req.query
            })
        }
        catch(err){
            res.send(err)
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
          return res.redirect('/login')
        }
        next()
      }
module.exports = router