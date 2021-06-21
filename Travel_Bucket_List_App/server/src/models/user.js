const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema =new Schema({
  name:{
    type: String,
    trim:true,// trim helps to remove widespaces before and after string
    required: true
  },
  email:{
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  hashed_password:{
    type: String,
    required: true
  },
  salt:String,
  role:{
    type:String,
    default: 'normal'
  },
  resetPasswordLink:{
    data: String,
    default: ""
  }
},{timestamps:true});

// Virtual password
// Virtuals are used to process the input data note they are not stored in the DB.
userSchema.virtual("password")
  .set(function(password){
    // set password must be a normal function not arrow function
    this.password=password;
    this.salt=this.makeSalt();
    this.hashed_password=this.encryptPassword(password)
  })
  .get(function(){
    return this._password
  })

// methods
userSchema.method = {
  // Generate Salt
  makeSalt:function(){
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
  encryptPassword:function(password){
    if(!password){
      return '';
    }
    try{

      return crypto.createHmac('sha1',this.salt)
        .update(password)
        .digest('hex');

    }catch(err){
      return err;
    }
  },
  // Compare plain password from user and the hashed in DB
  authenticate:function(plainPassword){
    return this.encryptPassword(plainPassword) === this.hashed_password;
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
