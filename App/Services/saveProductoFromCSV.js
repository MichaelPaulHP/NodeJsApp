'use strict'

var Product = require("../Models/Product");

var csv = require("fast-csv");

exports.saveProductFromCSV =function(pathFile){

    csv
        .fromPath(pathFile,{headers:true})
        .on("data", function(data){
            
            var p = new Product(data);
        
            //p = data;
            p.save(function(err){
                if(err){
                    console.log("error:",err.message)
                }
            });
            /*p.save(function (err){
                if(err){
                    console.log("error:",err.message)
                }
            });*/
        })
        .on("end", function(){
            console.log("done products");
        });
   
};