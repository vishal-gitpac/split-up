const express = require('express')
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/details')
const Detail = require('../models/details')
const Ride = require('../models/rides')
const router = express.Router()
// all rides route
router.get('/',checkAuthenticated,async (req,res)=>{
    
    
    try{
        
        const detail = await Detail.find({
            passengers : req.user.userName
        })
        
        
       const example= new Array
        for(i in detail){
            example.push(detail[i].id)
        }

       
        const myRide = await Ride.find({
            detail_id : example
        }).sort({createdAt: 'desc'})
        
        
       
        res.render('myrides/index',{
            myRide:myRide,
        })
    }
    catch(err){
        res.send(err)
    }

})

router.get('/:id',async (req,res)=>{

    try{

        const ride = await Ride.findById(req.params.id)
        const detail = await Detail.findOne({
            ride_id : req.params.id 
        })
        
        res.render('partials/ride_details.ejs',{
            ride: ride,
            detail:detail
        })


    } catch(err){
        res.send(err)
    }
})


router.post('/:id',async(req,res)=>{
    
        const ride = await Ride.findOneAndUpdate({
            _id: req.params.id
        },{
            $set:{status: false}
        })
        
        res.redirect('/myrides')
        
    
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