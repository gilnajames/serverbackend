//import mongoose

const mongoose = require('mongoose');

// create schema for project

const reviewSchema = new mongoose.Schema({
    moviename:{
        type:String,
        require:true
    },
    director:{
        type:String,
        require:true
    },
    Starring:{
        type:String,
        require:true
    },
    reviewer:{
        type:String,
        require:true
    },
    overview:{
        type:String,
        require:true
    },

    MovieImage:{
        type:String,
        require:true
    },

    userId:{
        type:String,
        require:true
    }


})
 const movies = mongoose.model("reviews",reviewSchema);
 module.exports = movies;