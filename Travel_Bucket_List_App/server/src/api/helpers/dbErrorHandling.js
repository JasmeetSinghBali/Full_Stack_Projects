"use strict"

/*
Custom Error handler for Mongo DB Errors
*/
const uniqueMessage= error =>{
  let output;
  try{
    let fieldName=error.message.split(".$")[1];
    field = field.split(" dub key")[0];
    field = field.substring(0,field.lastIndexOf("_"));
    req.flash("errors",[{
      message:"An account with this" + field + "already exists"
    }]);
    output = fieldName.charAt(0).toUpperCase()+fieldName.slice(1) + "already exists";
  }catch(err){
    output = "already exists";
  }
  return output;
}

exports.errorHandler=error=>{
  let message = ""
  if(error.code){
    switch(error.code){
      case 11000:
      case 11001:
        message = uniqueMessage(error)
        break;
      default:
        message = "Something went wrong"
    }
  }else{
    for (let errorName in error.errorors){
      if(error.errorors[errorName].message){
        message=error.errorors[errorName].message;
      }
    }
  }
  return message;
}
