const notFound=(req,res,next)=>{
  const error=new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);// goes to the real error handler
};


// eslint-disable-next-line no-unused-vars
const errorHandler=(error,req,res,next)=>{
  const statusCode=res.statusCode===200?500:res.statusCode;// in case this route has been reached because the user made a valid request and response was 200 but then eventually it resulted in error due to some reason then we return with code 500
  res.status(statusCode);

  res.json(
    {
      message:error.message,
      stack:process.env.NODE_ENV==='production'? '👻':error.stack// dont do this in production only for debugging purposes as in production a hacker may take advantage of the stack trace.
    }
  )
};

module.exports={
  notFound,
  errorHandler,
};
