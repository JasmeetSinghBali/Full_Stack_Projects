const {Router}=require('express');

const LogEntry=require('../models/Log.js');

// global API key
const {
  GLOBAL_API_KEY
}=process.env;

const router=Router();

// Get all Log entries
router.get('/',async (req,res,next)=>{
  //res.json({message:'✈️'});
  try{
    const data=await LogEntry.find();
    res.json(data);

  }catch(err){
    console.log(err);
    next(err); // directed to our error handler
  }

});

// Create New Log Entry
router.post('/',async (req,res,next)=>{
  try{

    // check for header X-GLOBAL-API-KEY
    if(req.get('X-GLOBAL-API-KEY')!==GLOBAL_API_KEY){
      //'👻 Access Denied! ☠️';
      res.status(401).json('👻 Access Denied! Invalid API-key');
      //throw new Error('Unauthorized');
    }

   // Validating Latitude and longitude
   var lat=req.body.latitude;
   var long=req.body.longitude;

   if(lat<-90 || lat >90){
     return res.status(422).json({message:'☠️ Invalid Latitide Entry! ☠️'});
   }

   if(long<-180 || long>180){
     return res.status(422).json({message:'☠️ Invalid Longitude Entry! ☠️'});
   }

   // Check For Duplicate Entry
   const titleEntry=await LogEntry.findOne({title:req.body.title});
   const dateEntry =await LogEntry.findOne({visitDate:req.body.visitDate});

   if(titleEntry || dateEntry){
     console.log(`🤞🤞🤞🤞🤞🤞 DUPLICATION ERROR: LOG ENTRY ALREADY PRESENT IN DATABASE WITH TITLE:🤞 ${req.body.title} & VISITDATE:🤞 ${req.body.visitDate}`);
     return res.status(409).json('Already Visited! This Log Entry is Already Present in the DB 🤞');
   }

   // Save the New Log Entry to DB
   const logEntry=new LogEntry(req.body);
   const newEntry=await logEntry.save();
   console.log('✈️ New Log Entry Added!')
   res.json(newEntry);



  }catch(err){
    // res.json({message:'🤞🏼'});
    //console.log(err.name); // returns ValidationError it gives the name of the error
    console.log(err);
    if(err.name==='ValidationError'){
      res.status(422).send(err.name+' ☠️ '+err.message);
    }
    next(err.message); // passed to error handler route in index.js
  }

});



module.exports=router;
