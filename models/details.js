const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
    ride_id:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true
    },
    passengers:{
        type: [String]
    },
    hostNumber:{
        type: Number
    }

    
})

module.exports =  mongoose.model('Detail',detailsSchema)