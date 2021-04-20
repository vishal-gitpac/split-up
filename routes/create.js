const express = require('express')
const Ride = require('../models/rides')
const Detail = require('../models/details')
const router = express.Router()
// all rides route
router.get('/',checkAuthenticated,async (req,res)=>{
    res.redirect('create/new')
    
})

// new ride route
router.get('/new',(req,res)=>{
    const ride = new Ride()
    res.render('create/new',{
        ride: ride
    })
})

//create a new ride route

router.post('/',async (req,res)=>{
    const ride = new Ride({
        creatorName: req.user.userName,
        pickupPoint: req.body.pickupPoint,
        dropoffPoint: req.body.dropoffPoint,
        noOfPassengers: req.body.noOfPassengers,
        price: req.body.price,
        date: new Date(req.body.date),
        time: req.body.time
    })
    const newDetail = new Detail()
    newDetail.ride_id = ride.id
    newDetail.passengers.push(ride.creatorName)
    newDetail.hostNumber=req.user.mobileNumber;
    ride.detail_id = newDetail.id
    
    try{
        await newDetail.save()
        
        const newRide = await ride.save()
        res.redirect(`create/done/${newRide.id}`)
       // res.redirect(`authors/${newAuthor.id}`)
    }
    catch(err){
        res.send(err)
    }

})
//after creating the ride

router.get('/done/:id',async (req,res)=>{
   
    try{

        const ride = await Ride.findById(req.params.id)
        res.render('create/done',{
            ride : ride
        })
   
   }
   catch{

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