import React from 'react';

import {Container,Typography,CssBaseline} from '@material-ui/core'

//import useStyles from './styles.js';

import {Chart} from 'react-google-charts';


const SMACard=({sma_clean_data,sma_symbol})=>{
  //const classes=useStyles();
  let yearKeys=Object.keys(sma_clean_data);
  let smaValues=Object.values(sma_clean_data);

  

  let plotData = [];
  plotData.push(['year','sma']);


  for (let i=0;i<yearKeys.length;i++){
    plotData.push([yearKeys[i],parseFloat(parseFloat(smaValues[i]['SMA']).toFixed(4))]);
  }

  return(
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" >
        <Typography component="div" style={{ backgroundColor: 'white', height: '50vh' }} >
          <h3>SMA for {sma_symbol} Symbol From Year {yearKeys[0]} To {yearKeys[yearKeys.length-1]} </h3>
          <h5>Monthly Technical Indicator : Simple Moving Average (SLA) </h5>
          <Chart
            width={'100%'}
            height={300}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={plotData}
            options={{
              hAxis: {
                title: 'Year',
              },
              vAxis: {
                title: 'SMA',
              },
            }}
          />
        </Typography>
      </Container>
      {window.screen.width<=460 || window.screen.height<=1000?null:
        <Container maxWidth="xl" >
          <Typography component="div" style={{ backgroundColor: 'white', height: '100%' }} >
            <h3>JSON Data</h3>
            <h4>dated: {(new Date()).toDateString()}</h4>
            <div><pre>{JSON.stringify(sma_clean_data,null,2)}</pre></div>
          </Typography>
        </Container>}
    </React.Fragment>
  );
}



export default SMACard;
