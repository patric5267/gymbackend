const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { body, validationResult } = require('express-validator');

dotenv.config({ path: './config.env' })

//createuser
router.post('/createuser',[
    body('email','enter a valid email').isEmail()
], async (req, res) => {
    try {
        const{name,email,password}=req.body
        const result = validationResult(req)
        if (!result.isEmpty()) {
            // console.log(result.array());
            return res.json(result.array())
        }
        else{
            const findemail = await user.findOne({email:email})
            if(findemail){
                return res.json({message:'user already exists'})
            }
            else{
                const hash = await bcrypt.hash(password , 10)
                const newuser = new user({name:name,email:email,password:hash})
                const saveuser = await newuser.save()
                if(saveuser){
                    return res.json({message:'saved profile'})
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/getuser' , async(req,res)=>{
    try {
        // console.log(req.params);
        const {name,email} = req.query
        const obj = {}
        if(name){
            obj.name = {$regex:name}
            
        }
        if(email){
            obj.email = email
            
        }
        console.log(obj);
        // const {name}=req.query
        // const obj={}
        // if(name){
        //     obj.name=name;
        //     console.log(obj);
        // }
        // console.log(req.query);
        // const {name} = req.params;
        const alluser = await user.find({ name2:'anuj' } , {name2:1})
        // const alluser = await user.updateOne({ name2: 'anuj', email: 'anuj@gmail.com' } , {$set:{email:'anuj2@gmail.com'}})
        return res.json(alluser)
     } catch (error) {
        console.log(error);
    }
})
//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ message: 'plz fill the fields properly' })
        }
        else {
            const findemail = await user.findOne({ email: email })
            if (findemail) {
                const checkpassword = await bcrypt.compare(password, findemail.password)
                if (checkpassword) {
                    const token = jwt.sign({ id: findemail._id }, process.env.SECRET)
                    return res.json({ message: 'login successful', token: token })
                }
                else {
                    return res.json({ message: 'invalid credentials' })
                }
            }
            else {
                return res.json({ message: 'invalid credentials' })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

//getuser
router.post('/getuser', async (req, res) => {
    try {
        const { token } = req.body
        console.log(token);
        const tokenverify = jwt.verify(token, process.env.SECRET)
        console.log(tokenverify);
        const finduser = await user.findById({ _id: tokenverify.id }).select('-password')
        if (finduser) {
            return res.json(finduser)
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router