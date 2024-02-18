const mongoose = require("mongoose");

const bookingSchema=mongoose.Schema({


    location : {
        type: String, required:true
    },
    locationid :{
        type: String, required:true
    },
    userid : {
        type: String, required:true
    },
    fromdate: {
        type: String, required:true

    },
    todate : {
        type: String, required:true
    },
    totaldays:{
        type: Number, required:true
    },
    transactionId:{
        type: String, required:true
    },
    status : {
        type: String, required:true, default : 'booked'
    }
}, {
    timestaps:true,
})
const bookingmodel = mongoose.model('bookings', bookingSchema);
module.exports =bookingmodel