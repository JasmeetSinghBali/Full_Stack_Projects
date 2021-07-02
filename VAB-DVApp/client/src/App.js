import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import CompanyCards from './components/CompanyCards/CompanyCards';

import useStyles from './styles.js';

const alan_key=process.env.REACT_APP_AI_API_KEY;

const App=()=>{

  const [companiesdata,setCompaniesData] = useState([]);
  const classes=useStyles();

  useEffect(()=>{
    alanBtn({
      key: alan_key,
      onCommand:({command,company_data})=>{
        if(command==='searchCompany'){
          setCompaniesData(company_data);
          console.log(company_data);
        }
      }
    })
  },[])

  return(
    <>
      <div className={classes.logoContainer} >
        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className={classes.aiLogo} alt="from unsplash"/>
      </div>
      <CompanyCards companydata={companiesdata} />
    </>
  )
}

export default App;
