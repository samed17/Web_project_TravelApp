const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageurls: {
        type: Array,
        default: []
    },
   
    type: {
        type: String,
        enum: ['Free', 'Not-Free'],
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;
