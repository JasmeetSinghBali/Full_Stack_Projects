import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Redirect,Switch} from'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './Screens/Register.js';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact render={props=><App {...props} />} />
        <Route path='/register' exact render={props=><Register {...props} />} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
