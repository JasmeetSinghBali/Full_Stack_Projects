// Upload image from frontend form to Cloudinary
const {Router}=require('express');
const express=require('express');
const app=express();
const router=Router();
const multer=require('multer');
const {storage}=require('./');
const upload=multer({dest:'uploads/'});
const axios=require('axios');



// to upload the image to cloudinary
router.post('/toCloudinary',(req,res,next)=>{
  try{
    console.log(req.body);
    res.send(typeof(req.body));

    //res.json({message:'Reached Backend'});
  }catch(err){
    // res.json({message:'🤞🏼'});
    //console.log(err.name); // returns ValidationError it gives the name of the error
    console.log(err);
    if(err.name==='ValidationError'){
      res.status(422).send(err.name+' ☠️ '+err.message);
    }
    next(err.message); // passed to error handler route in index.js
  }
})


module.exports=router;
