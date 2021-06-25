import * as React from 'react';
import { useState } from 'react';
import {getExchangeRates} from '../API.js';
import {useForm} from 'react-hook-form';
import {Alert,Card,Button} from 'react-bootstrap';
import Loader from './Loader';
import {ToastContainer,toast} from 'react-toastify';

import {Line} from 'react-chartjs-2';

const Chart=() => {

  const [successAPI,SetSuccessAPI]=useState(false);
  const [timestamp,SetTimestamps]=useState();
  const [rates,SetRates]=useState();
  const [loading,setLoading]=useState(false);
  const { register, handleSubmit } = useForm();



  const onSubmit=async(data)=>{
    setLoading(true);
    try{
      // pass the api key to API component to make the nomics api call
      const result=await getExchangeRates(data);
      if(!result){
        toast.error(`😕 Oh snap! 👻 Not able to parse the data...`);
        return;
      }
      if(result){
        toast.success(`🐱‍🚀 Data fetch from Nomics API was successfull!!`);
        SetSuccessAPI(true);
      }

      // Grabbing & organizing data for data visualization
      let Timestamps=[];
      let Rates=[];
      for (let item of result.data){
        Timestamps.push(item.timestamp)
        Rates.push(item.rate);

      }
      console.log('==============TIMESTAMPS==========');
      console.log(Timestamps);
      SetTimestamps(Timestamps);
      console.log('==============RATES==========');
      console.log(Rates);
      SetRates(Rates);


    }catch(err){
      toast.error(`👀 Authentication failed. Check your API key`);
      toast.dark(`😕 Resource Blocked! 👻 Not able to fetch data \n${err}`);
      console.log('Not able to fetch data from nomics,something Went Wrong...');
      setLoading(false);

    }
    setLoading(false);
    return;
  }

  const chartData = {
    labels: ['January', 'February', 'March',
             'April', 'May'],//year timestamps
    datasets: [
      {
        label: 'Exchange Rates',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]//rates
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
          <Alert variant="success"><Alert.Heading>Get insights on exchange rates history via Nomics API</Alert.Heading><p>Real-time crypto market cap rankings, historical prices, charts, all-time highs, supply data & more.<a href="https://p.nomics.com/cryptocurrency-bitcoin-api" target="_blank" rel="noreferrer">Get My Nomics API Key</a></p></Alert>
         }
        <Card.Body>
          <Card.Title>Enter Your Nomics API Key</Card.Title>
          <Card.Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" required placeholder="API Key" name="Nomics_API_Key" {...register("Nomics_API_Key", {})} />
              <br/>
              <br/>
              <Button input type="submit" variant="outline-dark" block>Inspect Exchange Rates!</Button>
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
                    text:'Average Rainfall per month',
                    fontSize:20
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
          <Alert variant="success"><Alert.Heading>Get insights on exchange rates history via Nomics API</Alert.Heading><p>Real-time crypto market cap rankings, historical prices, charts, all-time highs, supply data & more.<a href="https://p.nomics.com/cryptocurrency-bitcoin-api" target="_blank" rel="noreferrer">Get My Nomics API Key</a></p></Alert>
         }
      </Card>
    }

    </div>
  );
}

export default Chart;
