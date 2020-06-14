const mongoose = require('mongoose');


const heritageSiteSchema = mongoose.Schema({
    name: String,
    type:  String,
    period:  String,
    description:  String,
    ownership:  String,

    date: {
        founded: Date,
        dateBrief:  String
    },

    location: {
        county:  String,
        locatedIn: String,
        
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },

    size: {
        height: Number,
        width: Number,
        depth: Number,
        area: Number
    },

    access: {
        publicAccess: Boolean,
        type:  String
    },

    website:  String
}, {
    timestamps: true
});


module.exports = mongoose.model('heritageSites', heritageSiteSchema, 'heritageSites');