const express = require('express')
const Ride = require('../models/rides')
const Detail = require('../models/details')
const User = require('../models/user')


const { findById } = require('../models/rides')
const router = express.Router()
// find all available rides route
router.get('/',checkAuthenticated,async (req,res)=>{
    const searchOptions={}
    
    searchOptions.status = true
    
    searchOptions.filled = false
  //  console.log(req.user)
  //------------------------------------------  
  
    
    try{
        const myRide = await Ride.find({searchOptions,
   //         creatorName: {$ne: req.user.userName }
        }).sort({createdAt: 'desc'})
        
        
        res.render('find/index',{
            myRide:myRide,
            searchOptions: searchOptions
        })
    }
    catch(err){
        res.send(err)
    }
    
})

//join a group
router.get('/join',checkAuthenticated,async (req,res)=>{
   res.render('find/new') 
})



//join a group route

router.post('/',checkAuthenticated,async (req,res)=>{
    const searchOptions={}
    if(req.body.date != null && req.body.date !== ''){
        searchOptions.date = req.body.date
    }
    if(req.body.pickupPoint != null && req.body.pickupPoint !== ''){
        searchOptions.pickupPoint = new RegExp(req.body.pickupPoint, 'i')
    }
    if(req.body.dropoffPoint != null && req.body.dropoffPoint !== ''){
        searchOptions.dropoffPoint = new RegExp(req.body.dropoffPoint, 'i')
    }
    searchOptions.creatorName != req.user.userName 
    if(req.body.date != null && req.body.date !== ''){
        searchOptions.date = new Date(req.body.date)
    }
    
    
    searchOptions.status = true
    
    searchOptions.filled = false
    
    try{
        const myRide = await Ride.find({searchOptions,creatorName: {$ne: req.user.userName }}).sort({createdAt: 'desc'})
        
        res.render('find/index',{
            myRide:myRide,
            searchOptions:req.body
        })
    }
    catch(err){
        res.send(err)
    }
})

router.get('/:id',checkAuthenticated,async (req,res)=>{

    try{
        
        const ride = await Ride.findById(req.params.id)
        if(ride.noOfPassengers!=0){
            res.render('find/join',{
                ride: ride
                })
        }
        else{
            res.send('sorry')
        }
        
    } catch{
        res.redirect('/')
    }
    
})


router.post('/:id',checkAuthenticated,async (req,res)=>{
      
    try{
       
        const detail = await Detail.findOneAndUpdate({
            ride_id: req.params.id
        },{
            $push: { passengers: req.user.userName } 
        })


    const ride = await Ride.findById(req.params.id)
        ride.noOfPassengers = ride.noOfPassengers-1
        
        if(ride.noOfPassengers==0){
            ride.filled = true
       }
        
        //console.log(ride)
        
        
        await ride.save()
        
        
        res.redirect(`/myrides/${ride.id}`)
          
    
    } catch(err){
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
      return res.redirect('/')
    }
    next()
  }


module.exports = router