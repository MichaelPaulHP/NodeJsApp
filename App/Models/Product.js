'use strict'



var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');



var schema = mongoose.Schema;

//conect to DB ?

var ProductSchema = new schema ({
    asins:{type: String},
    brand:{type: String},
    categories:{type: String},
    colors:{type: String},
    count:{type: String},
    dateAdded:{type: String},
    dateUpdated:{type: String},
    descriptions:{type: String},
    dimension:{type: String},
    ean:{type: String},
    features:{type: String},
    flavors:{type: String},
    imageURLs:{type: String},
    isbn:{type: String},
    keys:{type: String},
    manufacturer:{type: String},
    manufacturerNumber:{type: String},
    merchants:{type: String},
    name:{type: String,unique: true},
    quantities:{type: String},
    reviews:{type: String},
    sizes:{type: String},
    skus:{type: String},
    sourceURLs:{type: String},
    upc:{type: String},
    websiteIDs:{type: String}
});
ProductSchema.plugin(uniqueValidator, { message: 'product ya existe' });
module.exports=mongoose.model('Product', ProductSchema);
/*name: {
        type: String
    },
    brand: {// marca
        type: String
    },
    categories: {
        type: String
    },
    colors:{
        type: String
    },
    descriptions:{
        type: String
    },

    asins:{type: String},
    brand:{type: String},
    categories:{type: String},
    colors:{type: String},
    count:{type: String},
    dateAdded:{type: String},
    dateUpdated:{type: String},
    descriptions:{type: String},
    dimension:{type: String},
    ean:{type: String},
    features:{type: String},
    flavors:{type: String},
    imageURLs:{type: String},
    isbn:{type: String},
    keys:{type: String},
    manufacturer:{type: String},
    manufacturerNumber:{type: String},
    merchants:{type: String},
    name:{type: String},
    prices.amountMin:{type: String},
    prices.amountMax:{type: String},
    prices.availability:{type: String},
    prices.color:{type: String},
    prices.condition:{type: String},
    prices.count:{type: String},
    prices.currency:{type: String},
    prices.dateAdded:{type: String},
    prices.dateSeen:{type: String},
    prices.flavor:{type: String},
    prices.isSale:{type: String},
    prices.merchant:{type: String},
    prices.offer:{type: String},
    prices.returnPolicy:{type: String},
    prices.shipping:{type: String},
    prices.size:{type: String},
    prices.source:{type: String},
    prices.sourceURLs:{type: String},
    prices.warranty:{type: String},
    quantities:{type: String},
    reviews:{type: String},
    sizes:{type: String},
    skus:{type: String},
    sourceURLs:{type: String},
    upc:{type: String},
    websiteIDs:{type: String},
    weight:{type: String}*/