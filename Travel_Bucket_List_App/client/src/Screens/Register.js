import React,{useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import {authenticate,isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './Register.css';

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
          toast.error('👀 Passwords don\'t match, please retype Password fields.');
        }
      }else{
        toast.dark('🐱‍🚀 Name,Email & Password can\'t be empty!!');
      }
    }


   // ============================ UNDER CONSTRUCTION ===========================
   // const wrapper__Area = document.querySelector('#wrapper_Area');
   //
   //  // Login & Sing-Up Forms
   //  const loginForm = document.querySelector('#loginForm');
   //  const signUpForm = document.querySelector('#signUpForm');
   //
   //  // All Login And Sing-Up Forms Inputs
   //  const allLoginFormFields = Array.from(document.querySelectorAll('#loginForm .input__group .field input'));
   //  const allSignUpFormFields = Array.from(document.querySelectorAll('#signUpForm .input__group:not(.confirm__group) .field input'));
   //
   //  // Password And Confirm Password Fileds
   //  const passwordField = document.querySelector('#signUpPassword');
   //  const confirmPassword = document.querySelector('#signUpConfirmPassword');
   //
   //  // Login % Sign-Up Submit Buttons
   //  const loginFormSubmitBtn = document.querySelector('#loginSubmitBtn');
   //  const signUpFormSubmitBtn = document.querySelector('#signUpSubmitBtn');
   //
   //  // Show Hide Password Element
   //  const showHidePassDom = Array.from(document.querySelectorAll('.showHide__Icon i'));
   //
   //  // Pattrens Regex
   //  const patterns = { // All This Regex Code Is For Demo You Can Add Your Own Regex Code :)
   //    username: /^[a-z]+\d?/,
   //    email: /^[^\W\d\.-_]+\w\d?@[a-z0-9]+\.([a-z0-9]{2,6})(\.[a-z0-9]{2,6})?$/,
   //    password: /^[^\d\W]\w+\d?\W?\w?/i,
   //  };
   //
   //  // Aside Area
   //  const aside__Area = document.querySelector('#aside_Area');
   //
   //  // Aside Sing-Up & Sign In Buttons
   //  const aside__SignUp_Button = document.querySelector('#aside_signUp_Btn');
   //  const aside__SignIn_Button = document.querySelector('#aside_signIn_Btn');
   //
   //  // - - - - -  Events - - - - - //
   //
   //  // When Submitting On Login & Sign-Up Forms
   //  loginForm.addEventListener('submit', (e) => {
   //    // Stop Form Submission
   //    e.preventDefault();
   //    // Call Login Form Validation Function
   //    loginFormValidation();
   //  });
   //  signUpForm.addEventListener('submit', (e) => {
   //    // Stop Form Submission
   //    e.preventDefault();
   //    // Call Sign-Up Form Validation Function
   //    signUpFormValidation();
   //  });
   //
   //  // Every Time Click On Aside Sign-Up & Sing-In Buttons. Call Function Chnage Form Mode
   //  aside__Area.addEventListener('click', chnageFormMode);
   //  aside__Area.addEventListener('click', chnageFormMode);
   //
   //  // - - - - -  Functions - - - - - //
   //
   //  // Change Form Mode Function
   //  function chnageFormMode(e) {
   //    // Check. If The Target Element Is Aside Sign-Up Button
   //    if(e.target === aside__SignUp_Button){
   //      // Add Class [ Sign Up Mode Active ] On Wrapper Area
   //      wrapper__Area.classList.add('sign-up__Mode-active');
   //    };
   //    // Check. If The Target Element Is Aside Sign-In Button
   //    if(e.target === aside__SignIn_Button){
   //      // Remove Class [ Sign Up Mode Active ] From Wrapper Area
   //      wrapper__Area.classList.remove('sign-up__Mode-active');
   //    };
   //  };
   //
   //  // Function Show Hide Password
   //  (function showHidePass() {
   //    // Loop On All The Show Hide Password Icon
   //    showHidePassDom.forEach(icon =>{
   //      // When Click On Any Show Hide Icon...
   //      icon.addEventListener('click', () => {
   //        // Select The Target Password Input
   //        const targetAreaInput = icon.parentElement.parentElement.querySelector('.field input');
   //        // If The Target Icon Has Hide-icon
   //        if(icon.className === 'bx bx-hide'){
   //          // Change The Target Icon Class
   //          icon.className = 'bx bx-show';
   //          // Change The Target Input Area Type
   //          targetAreaInput.setAttribute('type', 'text');
   //        }else{ // else
   //          // Change The Target Icon Class
   //          icon.className = 'bx bx-hide';
   //          // Change The Target Input Area Type
   //          targetAreaInput.setAttribute('type', 'password');
   //        };
   //      });
   //    });
   //  })();
   //
   //  // Login Form Validation Function
   //  function loginFormValidation() {
   //    // Loop On All The Inputs
   //    allLoginFormFields.forEach(input => {
   //      // Input Targte Field Name Value
   //      const inputAttribueValueName = input.attributes.name.value;
   //      // Input Value Without Spaces
   //      const inputValue = input.value.trim();
   //      // Input Regex Validation Response [ True || False ] :)
   //      const inputRegex = patterns[inputAttribueValueName].test(inputValue);
   //
   //      // Check If The Input Value Is Empty
   //      if(inputValue === ''){
   //        // Call Function Set Error For
   //        setErrorFor(input, `${inputAttribueValueName} is required. Please enter your response.`);
   //      }else if(inputRegex === false){ // Else If: If The InputRegext Response Is False
   //        // Call Function Set Error For
   //        setErrorFor(input, `${inputAttribueValueName} Is Invalid .`);
   //      }else{ // Else
   //        // Call Function Set Success For
   //        setSuccessFor(input);
   //      };
   //    });
   //  };
   //
   //  // Sign-Up Form Validation Function
   //  function signUpFormValidation() {
   //    // Loop On All The Inputs
   //    allSignUpFormFields.forEach(input => {
   //      // Password And Confirm Password Fileds Values Without Spaces
   //      const passwordFieldValue = passwordField.value.trim();
   //      const conifrmPassValue = confirmPassword.value.trim();
   //      // Input Targte Field Name Value
   //      const inputAttribueValueName = input.attributes.name.value;
   //      // Input Value Without Spaces
   //      const inputValue = input.value.trim();
   //      // Input Regex Validation Response [ True || False ] :)
   //      const inputRegex = patterns[inputAttribueValueName].test(inputValue);
   //
   //      // Check If The Input Value Is Empty
   //      if(inputValue === ''){
   //        // Call Function Set Error For
   //        setErrorFor(input, `${inputAttribueValueName} is required. Please enter your response.`);
   //      }else if(inputRegex === false){ // Else If: If The InputRegext Response Is False
   //        // Call Function Set Error For
   //        setErrorFor(input, `${inputAttribueValueName} Is Invalid .`);
   //      }else{ // Else
   //        // Call Function Set Success For
   //        setSuccessFor(input);
   //      };
   //
   //      // Validation The Confirm Password
   //      if(conifrmPassValue === ''){ // Check If The Confirm Password Value Is Empty
   //        // Call Function Set Error For
   //        setErrorFor(confirmPassword, `Confirm password is required. Please enter your response.`);
   //      }else if(conifrmPassValue !== passwordFieldValue){ // Check If The Confirm Password Value Is Dose Not Match The Password Filed
   //        // Call Function Set Error For
   //        setErrorFor(confirmPassword, `Confirm password does not match`);
   //      }else{ // Eles
   //        // Call Function Set Success For
   //        setSuccessFor(confirmPassword);
   //      };
   //
   //    });
   //  };
   //
   //  // Set Error For Function
   //  function setErrorFor(input, message){
   //    // Select The Target Parent Target Input Group
   //    const targetParentInput = input.parentElement.parentElement;
   //    // Select The Target Input Error Message
   //    const targetErrorMessage = targetParentInput.querySelector('.input__error_message');
   //
   //    // Remove Class FormSucess From The Parent Target
   //    targetParentInput.classList.remove('formSuccess');
   //    // Add Class Success On Target ParentElement
   //    targetParentInput.classList.add('formError');
   //    // Set The Message Inside The Target Error Message
   //    targetErrorMessage.innerHTML = message;
   //  };
   //
   //  // Set Success For Function
   //  function setSuccessFor(input){
   //    // Select The Target Parent Target Input Group
   //    const targetParentInput = input.parentElement.parentElement;
   //    // Select The Target Input Error Message
   //    const targetErrorMessage = targetParentInput.querySelector('.input__error_message');
   //
   //    // Remove Class FormError From The Parent Target
   //    targetParentInput.classList.remove('formError');
   //    // Add Class Success On Target ParentElement
   //    targetParentInput.classList.add('formSuccess');
   //    // Empty The Error Message
   //    targetErrorMessage.innerHTML = '';
   //  };





    return(
        <div className="wrapper__area" id="wrapper_Area">
          {isAuth()?<Redirect to='/' />:null}
          <ToastContainer
            position="bottom-center"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="forms__area">
              <form className="login__form" id="loginForm">

                <h1 className="form__title">Sign In!</h1>

                <div className="input__group">
                  <label className="field">
                    <input type="text" name="username" placeholder="Username" id="loginUsername" />
                  </label>
                  <span className="input__icon"><i className="bx bx-user"></i></span>
                  <small className="input__error_message"></small>
                </div>
                <div className="input__group">
                  <label className="field">
                    <input type="password" name="password" placeholder="Password" id="loginPassword" />
                  </label>
                  <span className="input__icon"><i className="bx bx-lock"></i></span>
                  <span className="showHide__Icon"><i className="bx bx-hide"></i></span>
                  <small className="input__error_message"></small>
                </div>
                <div className="form__actions">
                  <label htmlFor="checkboxInput" className="remeber_me">
                    <input type="checkbox" id="checkboxInput" />
                    <span className="checkmark"></span>
                    <span>Remeber Me</span>
                  </label>
                  <div className="forgot_password">Forgot Password?</div>
                </div>

                <button type="submit" className="submit-button" id="loginSubmitBtn">Sign in</button>

                <div className="alternate-login">
                  <div className="link">
                    <i className='bx bxl-google'></i>
                    <span>Google</span>
                  </div>
                  <div className="link">
                    <i className='bx bxl-facebook-circle'></i>
                    <span>Facebook</span>
                  </div>
                </div>
            </form>
            <form className="sign-up__form" id="signUpForm" name="signup" onSubmit={handleSubmit}>
                <h1 className="form__title">Sign Up!</h1>
                <div className="input__group">
                  <label className="field">
                    <input
                    type="text"
                    name="Name"
                    placeholder="Username123..."
                    id="signUpUsername"
                    onChange={handleChange('name')}
                    value={name}
                     />
                  </label>
                  <span className="input__icon"><i className="bx bx-user"></i></span>
                </div>
                <div className="input__group">
                  <label className="field">
                    <input
                     type="email"
                     name="Email"
                     placeholder="Email@example.com"
                     id="signUpEmail"
                     onChange={handleChange('email')}
                     value={email}
                     />
                  </label>
                  <span className="input__icon"><i className="bx bx-at"></i></span>
                </div>
                <div className="input__group">
                  <label className="field">
                    <input
                     type="password"
                     name="Password"
                     placeholder="Password123$#%&..."
                     id="signUpPassword"
                     onChange={handleChange('password1')}
                     value={password1}
                     />
                  </label>
                  <span className="input__icon"><i className="bx bx-lock"></i></span>
                  <span className="showHide__Icon"><i className="bx bx-hide"></i></span>
                </div>
                <div className="input__group confirm__group">
                  <label className="field">
                    <input
                     type="password"
                     name="Confirm Password"
                     placeholder="Confirm Password"
                     id="signUpConfirmPassword"
                     onChange={handleChange('password2')}
                     value={password2}
                     />
                  </label>
                  <span className="input__icon"><i className="bx bx-lock"></i></span>
                  <span className="showHide__Icon"><i className="bx bx-hide"></i></span>
                </div>
                <button type="submit" className="submit-button" id="signUpSubmitBtn">Sign Up</button>

                <div class="alternate-login">
                  <div class="link">
                    <i class='bx bxl-google'></i>
                    <span>Google</span>
                  </div>
                  <div class="link">
                    <i class='bx bxl-facebook-circle'></i>
                    <span>Facebook</span>
                  </div>
                </div>

              </form>
          </div>
          <div class="aside__area" id="aside_Area">
            <div class="login__aside-info">
              <h4>Welcome</h4>
              <img src="https://d.top4top.io/p_1945xjz2y1.png" alt="Image" />
              <p>Enter your personal details and start journey with us</p>
              <button id="aside_signUp_Btn">Sign Up</button>
            </div>
            <div class="sign-up__aside-info">
              <h4>Welcome</h4>
              <img src="https://e.top4top.io/p_1945sidbp2.png" alt="Image" />
              <p>To Keep connected with us please login with your personal info</p>
              <button id="aside_signIn_Btn">Sign In</button>
            </div>
          </div>
        </div>
      )
  }

export default Register;
