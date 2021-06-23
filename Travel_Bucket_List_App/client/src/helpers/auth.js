import cookie from 'js-cookie';

// Set the cookie Handler & localstorage cookie
export const setCookie = (key,value)=>{
  if(window!=='undefined'){
    cookie.set(key,value,{
      // 1 day expiry
      expires:1
    });
  }
}

// Destroy cookie Handler
export const removeCookie= key =>{
  if(window!=='undefined'){
    cookie.remove(key,{
      expires:1
    });
  }
}

// Get Cookie localStorage Handler
export const getCookie= key =>{
  if(window!=='undefined'){
    return cookie.get(key);
  }
}

// Set Cookie localstorage Handler
export const setLocalStorage=(key,value)=>{
  if(window!=='undefined'){
    localStorage.setItem(key,JSON.stringify(value));
  }
}

// Destroy localStorage Handler
export const removeLocalStorage= key =>{
  if(window!=='undefined'){
    localStorage.removeItem(key);
  }
}

// Authenticate user after signed in
export const authenticate=(response,next)=>{
  setCookie('token',response.data.token);
  setLocalStorage('user',response.data.user);// with user as key and value pair for the cookie
  next();
}

// Signing Out User
export const signout = next =>{
  removeCookie('token');
  removeLocalStorage('user');
}

// Get User information from localstorage
export const isAuth=()=>{
  if(window!=='undefined'){
    const cookieChecked=getCookie('token');
    if(cookieChecked){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
      }else{
        return false;
      }
    }
  }
}

// update User Data in localStorage
export const updateUser=(response,next)=>{
  if(window!=='undefined'){
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user',JSON.stringify(auth));
  }
  next();
}
