require('dotenv').config();
const PORT = process.env.API_PORT || 5001;

const express = require('express');

const mountRoutes = require('./routes');
const app = express();


const morgan = require('morgan');


app.use(express.json());
app.use(morgan("dev"));



// api home route
app.get('/api/v1',(req,res)=>{
  try{
    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!"
    });
  }catch(err){
    return res.status(404).json({
      status: "Down",
      message: " 💀 API Broke!!"
    });
  }
});

mountRoutes(app);


// minimal error handler for invalid routes
app.use((req,res)=>{
  return res.status(404).json({
    status: "Failed‍👤",
    message: "Route not found!"
  });
})


app.listen(5000,()=>{
  console.log(`Server started at PORT: ${PORT}`);
});
