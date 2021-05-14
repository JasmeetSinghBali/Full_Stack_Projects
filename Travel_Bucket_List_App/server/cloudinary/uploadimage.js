// Upload image from frontend form to Cloudinary
const {Router}=require('express');
const router=Router();
const multer=require('multer');
const {storage}=require('./config');
const upload=require({storage});

// to upload the image to cloudinary
router.post('/',upload.array('image'),(req,res,next)=>{
  try{
    console.log(req.body,req.files);
    res.send("It Worked!");
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
