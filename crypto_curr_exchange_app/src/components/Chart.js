import * as React from 'react';
import { useState } from 'react';
import {getExchangeRates} from '../API.js';
import {useForm} from 'react-hook-form';
import {Alert,Card,Button} from 'react-bootstrap';
import Loader from './Loader';
import {ToastContainer,toast} from 'react-toastify';

const Chart=() => {

  const [loading,setLoading]=useState(false);
  const { register, handleSubmit } = useForm();



  const onSubmit=async(data)=>{
    setLoading(true);
    console.log(data);
    try{
      // pass the api key to API component to make the nomics api call
      const result=await getExchangeRates(data);
      console.log('This is response from nomics');
      console.log(result);
    }catch(err){
      toast.error(`😕 Oh snap! 👻 Not able to fetch data from nomics please try again later..\n${err}`);
      console.log('Not able to fetch data from nomics,something Went Wrong...');
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  return (
    <div>
      <ToastContainer />
      {/*Ask for nomics key
      call the API endpoint
      display the response from nomics via chart*/}
      <Card style={{ width: '18rem' }}>
        {loading?<Loader />:
          <Alert variant="success"><Alert.Heading>Get insights on exchange rates history via Nomics API</Alert.Heading><p>Real-time crypto market cap rankings, historical prices, charts, all-time highs, supply data & more.<a href="https://p.nomics.com/cryptocurrency-bitcoin-api" target="_blank" rel="noreferrer">Get My Nomics API Key</a></p></Alert>
         }
        <Card.Body>
          <Card.Title>Enter Your Nomics API Key</Card.Title>
          <Card.Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" required placeholder="API Key" name="Nomics API Key" {...register("Nomics API Key", {})} />
              <br/>
              <br/>
              <Button input type="submit" variant="outline-dark" block>Inspect Exchange Rates!</Button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Chart;
