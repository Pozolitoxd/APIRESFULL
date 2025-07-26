const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    referencia: {
        type: Number, required: true
    },
    nombre:{
        type:String, required: true
    },
    descripcion:{
        type: String, required: true
    },
    cantidad:{
        type:Number,required: true
    }
}) 

module.exports= mongoose.model('Products',productSchema);