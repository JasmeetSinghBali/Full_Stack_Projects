import React,{useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import {authenticate,isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


import authSvg from '../assests/auth.svg';



const Register = () =>{
    const [formData,setFormData] = useState({
      name:"",
      email:"",
      password1:"",
      password2:"",
      textChange: 'Sign Up'
    });
    const {email,name,password1,password2}=formData;

    const [myerror,setMyError]=useState(false);

    // Handle Form Data
    const handleChange=text=>e=>{
      setFormData({...formData,[text]:e.target.value});

    }

    // Handle Submit button to send data to backend
    const handleSubmit=e=>{
      e.preventDefault();

      // client side validation
      if(password1.length<=8){
        setMyError(true);
        toast.info('🐱‍🚀 Password length must be at least 9 characters long..');
        return;
      }
      if(name.length<=4){
        setMyError(true);
        toast.info('🐱‍🚀 Enter a Valid Name...');
        return;
      }
      if(name && email && password1){
        if(password1===password2){
          toast.success('🎉SignUp Process Initiated...');
          // make the backend request and send form data
          axios.post(`${process.env.REACT_APP_API_URL}/register`,{
            name,email,password:password1
          }).then(res=>{
            setFormData({...formData,
              name: '',
              email:'',
              password1:'',
              password2:'',
              textChange: 'Submitted'
            });
            toast.success(`✔ ${res.data.message}`)
          }).catch(err=>{
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Sign Up'
            });
            console.log(err.response);
            toast.error(err.response.data.error);
          });


        }else{
          setMyError(true);
          toast.info('🐱‍🚀 Passwords don\'t match, please retype Password fields.');
        }
      }else{
        setMyError(true);
        toast.dark('🐱‍🚀 Name,Email & Password can\'t be empty!!');
      }
    }



    return(
      <div className="container">
        {isAuth()?<Redirect to='/' />:null}
        <ToastContainer
          position="bottom-center"
          autoClose={9000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="title">Sign Up for  💖 Travel-Bucket List 💖</div>
        <form  onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Name</span>
              <input
                type="text"
                name="Name"
                placeholder="Username123..."
                onChange={handleChange('name')}
                value={name}
               />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
               type="email"
               name="Email"
               placeholder="Email@example.com"
               onChange={handleChange('email')}
               value={email}
               />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
               type="password"
               name="Password"
               placeholder="Password123$#%&..."
               onChange={handleChange('password1')}
               value={password1}
               />
            </div>
            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input
               type="password"
               name="Confirm Password"
               placeholder="Confirm Password"
               onChange={handleChange('password2')}
               value={password2}
               />
            </div>
          </div>



             <button type="submit">{formData.textChange}</button>
        </form>
      </div>
      )
  }

export default Register;
