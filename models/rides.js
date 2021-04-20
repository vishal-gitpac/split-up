const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    creatorName: {
        type: String,
        required: true
    },
    pickupPoint:{
        type: String,
        required: true
    },
    dropoffPoint:{
        type: String,
        required: true
    },
    noOfPassengers:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: true
    },
    filled:{
        type: String,
        default: false
    },
    date:{
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    detail_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    time:{
        type: String,
        required: true
    }
    
})

module.exports =  mongoose.model('Ride',rideSchema)