import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import CompanyCards from './components/CompanyCards/CompanyCards';
import FxCards from './components/FxCards/FxCards';
import SMACards from './components/SMACards/SMACards';
import TSMACards from './components/TSMACards/TSMACards';

import cleanData from './Helpers/cleanData';

import useStyles from './styles.js';

const alan_key=process.env.REACT_APP_AI_API_KEY;

const App=()=>{

  const [companiesdata,setCompaniesData] = useState([]);

  const [activeCompany,setActiveCompany] = useState(-1);

  const [fxmonthlydata,setFxMonthlyData] = useState();

  const [fxinitiated,setFxInitiated] = useState(false);
  const [fromsymbol,setFromSymbol]=useState();
  const [tosymbol,setToSymbol]=useState();

  const [smainitiated,setSMAInitiated] = useState(false);
  const [smadata,setSMAData] = useState();
  const [sma_symbol,setSMA_Symbol] = useState();

  const [tsmainitiated,setTSMAInitiated] = useState(false);
  const [tsmadata,setTSMAData] = useState();
  const [tsmasymbol,setTSMA_Symbol] = useState();

  const classes=useStyles();

  useEffect(()=>{
    alanBtn({
      key: alan_key,
      onCommand:({command,company_data,frmSymbol,toSymbol,sma_symbol,tsma_symbol})=>{
        if(command==='searchCompany'){
          setCompaniesData(company_data);
          setActiveCompany(-1);
        }
        if(command==="home"){
          window.location.reload();
        }
        if(command === 'highlight'){
          setActiveCompany((prevActiveCompany)=>prevActiveCompany+1);
        }
        if(command==='fxMONTHLY'){

          const api_data = cleanData(company_data);
          //console.log(cleanData[0]);
          setFxMonthlyData(api_data);
          setFromSymbol(frmSymbol);
          setToSymbol(toSymbol);
          setFxInitiated(true);
        }
        if(command==='smaMONTHLY'){

          const api_data = cleanData(company_data);
          setSMAData(api_data);
          setSMA_Symbol(sma_symbol);
          setSMAInitiated(true);
        }
        if(command==='tsmaMONTHLY'){

          const api_data = cleanData(company_data);

          setTSMAData(api_data);
          setTSMA_Symbol(tsma_symbol);
          setTSMAInitiated(true);
        }
      }
    })
  },[]);

  if(tsmainitiated){
    return(
      <>
        <div className={classes.logoContainer} >
          <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className={classes.aiLogo} alt="from unsplash"/>
        </div>
        <TSMACards tsma_data={tsmadata} tsma_symbol={tsmasymbol} />
      </>
    );
  }

  if(fxinitiated){
    return(
      <>
        <div className={classes.logoContainer} >
          <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className={classes.aiLogo} alt="from unsplash"/>
        </div>
        <FxCards fx_data={fxmonthlydata} frmSymbol={fromsymbol} toSymbol={tosymbol} />
      </>
    );
  }

  if(smainitiated){
    return(
      <>
        <div className={classes.logoContainer} >
          <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className={classes.aiLogo} alt="from unsplash"/>
        </div>
        <SMACards sma_data={smadata} sma_symbol={sma_symbol} />
      </>
    );
  }

  return(
    <>
      <div className={classes.logoContainer} >
        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className={classes.aiLogo} alt="from unsplash"/>
      </div>
      <CompanyCards companydata={companiesdata} activeCompany={activeCompany} />
    </>
  );
}

export default App;
