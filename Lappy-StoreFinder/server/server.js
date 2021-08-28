require('dotenv').config();
const PORT = process.env.API_PORT || 5001;

const express = require('express');
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

// get all stores
app.get('/api/v1/stores',(req,res)=>{
  try{
    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      data: 'Here goes the list of stores'
    });
  }catch(err){
    return res.status(404).json({
      status: "Failed",
      message: " 💀 API Broke!!"
    });
  }
});

// get store by id
app.get('/api/v1/stores/:id',(req,res)=>{
  try{
    // 200 success
    console.log(req.params);
  }catch(err){
    //handle error
  }
});

// add new store
app.post('/api/v1/stores',(req,res)=>{
  try{

    // 201 created
    console.log(req.body);
    // here goes the add store logic
  }catch(err){
    //handle error
  }
});

// update existing store by id
app.put('/api/v1/stores/:id',(req,res)=>{
  try{
    // 200 success
    console.log(req.body);
    // here goes the update store logic
  }catch(err){
    //handle error
  }
});

// delete store by id
app.delete('/api/v1/stores/:id',(req,res)=>{
  try{
    // 204 success
    console.log(req.body);
    // here goes the delete store logic
  }catch(err){
    //handle error
  }
});

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
