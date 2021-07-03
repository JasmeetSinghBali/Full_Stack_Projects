import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import CompanyCards from './components/CompanyCards/CompanyCards';
import FxCards from './components/FxCards/FxCards';

import useStyles from './styles.js';

const alan_key=process.env.REACT_APP_AI_API_KEY;

const App=()=>{

  const [companiesdata,setCompaniesData] = useState([]);
  const [fxmonthlydata,setFxMonthlyData] = useState();
  const classes=useStyles();

  useEffect(()=>{
    alanBtn({
      key: alan_key,
      onCommand:({command,company_data})=>{
        if(command==='searchCompany'){
          setCompaniesData(company_data);

        }
        if(command==='fxMONTHLY'){
          let rawData={};
          let cleanData=[];

          for(let [key,value] of Object.entries(company_data)){
              let newYear = key.substring(0,4);
              rawData[newYear]=value;
              cleanData.push(rawData);
          }
          //console.log(cleanData[0]);
          setFxMonthlyData(cleanData[0]);
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
      <FxCards fx_data={fxmonthlydata} />
    </>
  )
}

export default App;
