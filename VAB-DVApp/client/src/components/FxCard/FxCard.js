import React from 'react';

import {Container,Typography,CssBaseline} from '@material-ui/core'

//import useStyles from './styles.js';

import {Chart} from 'react-google-charts';


const FxCard=({fx_clean_data,frmSymbol,toSymbol})=>{
  //const classes=useStyles();
  //console.log(fx_clean_data);
  let yearKeys=Object.keys(fx_clean_data);
  let ohlcValues=Object.values(fx_clean_data);
  //console.log(frmSymbol,toSymbol);

  // from this
  // {
  //   {2014:{open:openValue,high:highValue,low:lowValue,close:closeValue}},
  //   {2015:{............}},
  //   .....
  // }

  // to this
  //
  //   [
  //     ['year','open','high','low','close'],
  //     ['2014',openValue,highValue,lowValue,closeValue]
  //   ]
  //

  let plotData = [];
  plotData.push(['year','open','high','low','close']);
  // console.log(plotData);
  // console.log(yearKeys);
  // console.log(ohlcValues);


  yearKeys.forEach((ky,index)=>{
    //console.log(ky,vl);
    const vl=ohlcValues[index];
    let pushData=[ky,parseFloat(parseFloat(vl['1. open']).toFixed(5)),parseFloat(parseFloat(vl['2. high']).toFixed(5)),parseFloat(parseFloat(vl['3. low']).toFixed(5)),parseFloat(parseFloat(vl['4. close']).toFixed(5))];
    plotData.push(pushData);
  });
  //console.log(plotData);






  return(
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" >
        <Typography component="div" style={{ backgroundColor: 'white', height: '50vh' }} >
          <h3>FX Monthly Time Series for {frmSymbol} to {toSymbol}, From Year {yearKeys[0]} To {yearKeys[yearKeys.length-1]} </h3>
          <h5>open-high-low-close (OHLC) </h5>
          <Chart
            width={'100%'}
            height={300}
            chartType="CandlestickChart"
            loader={<div>Loading Chart</div>}
            data={plotData}
            options={{
              legend: 'none',
              bar: { groupWidth: '50%' },
              candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#0f9d58' },
                risingColor: { strokeWidth: 0, fill: '#0f9d58' },
              }
            }}

          />
        </Typography>
      </Container>
      {window.screen.width<=460 || window.screen.height<=1000?null:
        <Container maxWidth="xl" >
          <Typography component="div" style={{ backgroundColor: 'white', height: '100%' }} >
            <h3>JSON data</h3>
            <div><pre>{JSON.stringify(fx_clean_data,null,2)}</pre></div>
          </Typography>
        </Container>}
    </React.Fragment>
  );
}



export default FxCard;
