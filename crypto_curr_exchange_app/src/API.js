import axios from 'axios';

const API_URL=`https://api.nomics.com/v1/exchange-rates/history`

export async function getExchangeRates(api_key){

  const response=await axios.get(`${API_URL}?key=${api_key}&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z`);
  console.log(response);

  return response.json();
}
