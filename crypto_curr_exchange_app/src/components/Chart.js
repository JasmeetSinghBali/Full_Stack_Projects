import * as React from 'react';
import { useState } from 'react';
import {getExchangeRates} from '../API.js';
import {useForm} from 'react-hook-form';
import {Alert,Card,Button} from 'react-bootstrap';
import Loader from './Loader';
import {ToastContainer,toast} from 'react-toastify';

import {Line} from 'react-chartjs-2';

const Chart=() => {


  const [successAPI,setSuccessAPI]=useState(false);
  const [plotdata,setPlotData]=useState({});
  const [loading,setLoading]=useState(false);
  const { register, handleSubmit } = useForm();





  const onSubmit=async(data)=>{
    setLoading(true);
    try{
      console.log(data);
      // pass the api key to API component to make the nomics api call
      const result=await getExchangeRates(data);
      if(!result){
        toast.error(`😕 Oh snap! 👻 Not able to parse the data...`);
        return;
      }
      if(result){
        toast.success(`🐱‍🚀 Data was was successfully fetched from Nomics API !!`);
        setSuccessAPI(true);
      }

      // Grabbing & organizing data for data visualization
      // [
      //    {
      //      {key}timestamp:(value)rate
      //    }
      //  ]
      console.log(result);
      console.log("===============Computing=============");
      let rawData={};

      // only take out the year
      let getdate=result.data[0].timestamp;
      let year=getdate.substring(0,4);


      rawData[year]=result.data[0].rate;
      let cleanData=[];



      for (let i=1;i<result.data.length;i++){
         let getDate=result.data[i].timestamp;
         let newYear=getDate.substring(0,4);
         rawData[newYear]=result.data[i].rate;
         cleanData.push(rawData);
       }
      //console.log(cleanData[0]);


      setPlotData(cleanData[0]);
      toast.success('🐱‍🚀Data plotted successfully !!')
      // console.log(plotdata);



    }catch(err){
      toast.error(`👀 Authentication failed. Check your API key`);
      toast.dark(`😕 Resource Blocked! 👻 Not able to fetch data \n${err}`);
      console.log('Not able to fetch data from nomics,something Went Wrong...');
      setLoading(false);

    }
    setLoading(false);
    return;
  }

  // final data for plotting
  const plotThisData = plotdata;
  const chartLabels = Object.keys(plotThisData);
  const chartOrganizedData = Object.values(plotThisData);


  const chartData = {
    labels: chartLabels,//year timestamps
    datasets: [
      {
        label: 'Exchange Rates',
        fill: true,
        lineTension: 1,
        backgroundColor: 'rgba(255,99,71,0.5)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: chartOrganizedData//rates
      }
    ]
  }

  return (
    <div>
      <ToastContainer />
      {/*Ask for nomics key
      call the API endpoint
      display the response from nomics via chart*/}
      {!successAPI?
      <Card style={{ width: '18rem' }}>
        {loading?<Loader />:
          <Alert variant="success"><Alert.Heading>Get insights on exchange rates history via Nomics API</Alert.Heading><p><a href="https://p.nomics.com/cryptocurrency-bitcoin-api" target="_blank" rel="noreferrer">Get Your Nomics API Key Here</a></p></Alert>
         }
        <Card.Body>
          <h6>Enter Your Nomics API Key</h6>
          <Card.Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" required placeholder="API Key" name="Nomics_API_Key" {...register("Nomics_API_Key", {})} />
              <br/>
              <br/>
              <h6>
                Currency
              </h6>
              <select name="supported_currency" {...register("supported_currency", {})} required>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
                <option value="BNB">BNB</option>
                <option value="USDC">USDC</option>
              </select>
              <br/>
              <br/>
              <h6>
                Select from date
              </h6>
              <input type="datetime-local" placeholder="From Date" name="start_date" {...register("start_date", {})} required/>
              <br/>
              <br/>
              <Button input type="submit" variant="outline-dark" block>👀 Inspect Exchange Rates Till Today</Button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
      :
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Exchange Rates History</Card.Title>
          <Card.Text>
            <div>
              <Line
                data={chartData}
                options={{
                  title:{
                    display:true,
                    text:'Exchange Rates History',
                    fontSize:40
                  },
                  legend:{
                    display:true,
                    position:'right'
                  }
                }}
              />
            </div>
          </Card.Text>
        </Card.Body>
        {loading?<Loader />:
          <Alert variant="success"><Alert.Heading>Get insights on exchange rates history via Nomics API</Alert.Heading><p>Real-time crypto market cap rankings, historical prices, all-time highs, supply data & more.<a href="https://p.nomics.com/cryptocurrency-bitcoin-api" target="_blank" rel="noreferrer">Get My Nomics API Key</a></p></Alert>
         }
      </Card>
    }

    </div>
  );
}

export default Chart;
