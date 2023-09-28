const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    images:[
        {
            url:{
                type:String,
                require:true
            }
        }
    ]
})

const product = mongoose.model('PRODUCT' , productSchema)
module.exports=product