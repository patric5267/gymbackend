const mongoose = require('mongoose')
const dotenv =require('dotenv')

dotenv.config({path:'./config.env'})

const connect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE)
        if(connect){
            console.log('connection successful');
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports=connect