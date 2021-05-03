const {Router}=require('express');

const LogEntry=require('../models/Log.js');

const router=Router();

router.get('/',(req,res)=>{
  res.json({message:'✈️'});
});

router.post('/',async (req,res,next)=>{
  try{
    const logEntry=new LogEntry(req.body);
    const newEntry=await logEntry.save();
    res.json(createdEntry);
  }catch(err){
    // res.json({message:'🤞🏼'});
    //console.log(err.name); // returns ValidationError it gives the name of the error

    if(err.name==='ValidationError'){
      res.status(422);
    }
    next(err.message); // passed to error handler route in index.js
  }

});



module.exports=router;
