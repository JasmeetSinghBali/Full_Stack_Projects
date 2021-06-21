const User = require('../../models/user');
const expressJWT=require('express-jwt');
const _ =require('lodash');
const {OAuth2Client} = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Custom Error handler for error originated from DB
const { errorHandler } =require('../helpers/dbErrorHandling');

exports.registerController=(req,res) =>{

  const {name,email,password}=req.body;
  console.log(name,email,password);
  if(!req.body){
    return new Error('Request body cannot be empty...');
  }
  res.json({
    success: true,
    message: 'Register Route'
  })
};
