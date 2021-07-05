import React from 'react';

import {Container,Typography,CssBaseline} from '@material-ui/core'

//import useStyles from './styles.js';

import {Chart} from 'react-google-charts';


const TSMACard=({tsma_clean_data,tsma_symbol})=>{
  //const classes=useStyles();
  let yearKeys=Object.keys(tsma_clean_data);
  let tsmaValues=Object.values(tsma_clean_data);

  // console.log('==== TSMA DATA =====');
  // console.log(tsma_symbol);
  // console.log(yearKeys);
  // console.log(tsmaValues);

  let plotData=[];
  plotData.push(['Year','open','high','adjustedclose']);

  yearKeys.forEach((ky,index)=>{
    //console.log(ky,vl);
    const vl=tsmaValues[index];
    let pushData=[ky,parseFloat(parseFloat(vl['1. open']).toFixed(5)),parseFloat(parseFloat(vl['2. high']).toFixed(5)),parseFloat(parseFloat(vl['5. adjusted close']).toFixed(5))];
    plotData.push(pushData);
  });



 let plotDonut=[];
 plotDonut.push(['Year','Volume']);

 yearKeys.forEach((ky,index)=>{
   const vl=tsmaValues[index];
   let pushsecData = [ky,parseFloat(parseFloat(vl['6. volume']).toFixed(10))];
   plotDonut.push(pushsecData);
 });




  return(
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" >
        <Typography component="div" style={{ backgroundColor: 'white', height: '50vh',alignItems:'center' }} >
            <Chart
              width={'700px'}
              height={'400px'}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={plotData}
              options={{
                chart: {
                  title: `TSMA for ${tsma_symbol.toUpperCase()} Symbol From Year ${yearKeys[0]} To ${yearKeys[yearKeys.length-1]}`,
                  subtitle: 'Stock TimeSeries Monthly Adjusted',
                },
              }}
            />
          </Typography>
      </Container>
      <Container maxWidth="xl" >
        <Typography component="div" style={{ backgroundColor: 'white', height: '50vh' }} >
          <Chart
            width={'800px'}
            height={'400px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={plotDonut}
            options={{
              title: `Stock TimeSeries Volumes For Year ${yearKeys[0]} To ${yearKeys[yearKeys.length-1]}`,
              legend: 'none',
              pieSliceText: 'label',
              slices: {
                1:  { offset : 0.1},
                6:  { offset: 0.3 },
                11: { offset: 0.3 },
                16: { offset: 0.3 },
                21: { offset: 0.1 },
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
            <div><pre>{JSON.stringify(tsma_clean_data,null,2)}</pre></div>
          </Typography>
        </Container>}
    </React.Fragment>
  );
}



export default TSMACard;
