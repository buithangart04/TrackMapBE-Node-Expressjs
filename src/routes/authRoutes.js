const express= require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router  = express.Router();
router.post('/signup', async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = new User({email,password});
        await user.save();
        const token = jwt.sign({userId:user._id},"MY_SECRECT_KEY");
        res.send({token});
    }catch(err){
        res.status(422).send(err.message);
    }
});
router.post('/signin',async (req,res)=>{
     const {email,password}= req.body;
     if(!email||!password) return res.status(422).send({error :'Must fill'});
     const user = await User.findOne({email});
     if(!user){
         return res.status(404).send({error:'not find email'});
     }
     try{
         await user.comparePassword(password);
         const token = jwt.sign({userId:user._id},"MY_SECRECT_KEY");
         res.send({token});
     }catch(err){
         return res.status(422).send({error:'Invalid password or email'});
     }
     
});
// const [state,dispatch]= useReducer (reducer , initialState);
// dispatch({type ,payload})
module.exports=router;
