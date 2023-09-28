const express = require('express')
const app = express()
const connection = require('./connection/connection')
const cors = require('cors')

app.use(cors())
app.use(express.json())
connection()
app.get('/' , (req,res)=>{
    return res.send('hello world')
})
app.use(require('./routes/user'))
app.use(require('./routes/product'))
app.listen('5000' , ()=>{
    console.log('Started on port 5000');
})