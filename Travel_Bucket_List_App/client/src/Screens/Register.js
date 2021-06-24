import React,{useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import {authenticate,isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


const Register = () =>{
    const [formData,setFormData] = useState({
      name:"",
      email:"",
      password1:"",
      password2:""
    });
    const {email,name,password1,password2}=formData;

    // Handle Form Data
    const handleChange=text=>e=>{
      setFormData({...formData,[text]:e.target.value})
    }

    // Handle Submit button to send data to backend
    const handleSubmit=e=>{
      e.preventDefault();

      // client side validation
      if(name && email && password1){
        if(password1===password2){

          // make the backend request and send form data
          axios.post(`${process.env.REACT_APP_API_URL}/register`,{
            name,email,password:password1
          }).then(res=>{
            setFormData({...formData,
              name: '',
              email:'',
              password1:'',
              password2:''
            });
            toast.success(res.data.message)
          }).catch(err=>{
            toast.error(err.response.data.error);
          });


        }else{
          toast.error('👀Passwords don\'t match, please retype Password fields.');
        }
      }else{
        toast.error('🐱‍🚀Name/Email/Password cannot be empty!!');
      }
    }



    return(
        <div className="form-content-right">
          {isAuth()?<Redirect to='/' />:null}
          <ToastContainer />
          <form name="signup" onSubmit={handleSubmit}>
              <h1>Getstarted with us today! Create your account by filling out the information below.</h1>
              <div className="form-inputs">
                <label htmlFor='Name' className='form-label'>
                  Name
                </label>
                <input
                  name='Name'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name}
                  className='w-half px-4 py-0.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                />
              </div>
              <div className="form-inputs">
                <input
                  name='Email'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                  className='w-half px-4 py-0.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                />
              </div>
              <div className="form-inputs">
                <input
                  name='Password'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                  className='w-half px-4 py-0.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                />
              </div>
              <div className="form-inputs">
                <input
                  name='Confirm Password'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange('password2')}
                  value={password2}
                  className='w-half px-4 py-0.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                />
              </div>
              <div className="form-inputs">
                <button
                type='submit'
                className='submitButton'
                >Sign Up</button>
              </div>

            </form>
          </div>
      )
  }

export default Register;
