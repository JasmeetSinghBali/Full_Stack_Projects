import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import CompanyCards from './components/CompanyCards/CompanyCards';
import FxCards from './components/FxCards/FxCards';
import SMACards from './components/SMACards/SMACards';
import TSMACards from './components/TSMACards/TSMACards';

import useStyles from './styles.js';

const alan_key=process.env.REACT_APP_AI_API_KEY;

const App=()=>{

  const [companiesdata,setCompaniesData] = useState([]);
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
          setFromSymbol(frmSymbol);
          setToSymbol(toSymbol);
          setFxInitiated(true);
        }
        if(command==='smaMONTHLY'){
          let rawData={};
          let cleanData=[];

          for (let [key,value] of Object.entries(company_data)){
            let newYear = key.substring(0,4);
            rawData[newYear]=value;
            cleanData.push(rawData);
          }
          setSMAData(cleanData[0]);
          setSMA_Symbol(sma_symbol);
          setSMAInitiated(true);
        }
        if(command==='tsmaMONTHLY'){
          let rawData={};
          let cleanData=[];

          for (let [key,value] of Object.entries(company_data)){
            let newYear = key.substring(0,4);
            rawData[newYear]=value;
            cleanData.push(rawData);
          }

          setTSMAData(cleanData[0]);
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
      <CompanyCards companydata={companiesdata} />
    </>
  );
}

export default App;
