import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import CompanyCards from './components/CompanyCards/CompanyCards';

const alan_key='';

const App=()=>{

  const [companiesdata,setCompaniesData] = useState([]);

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
      <h1>VAB-DVApp</h1>
      <CompanyCards companydata={companiesdata} />
    </>
  )
}

export default App;
