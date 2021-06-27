import axios from 'axios';

const API_URL=`https://api.nomics.com/v1/exchange-rates/history`

export async function getExchangeRates(data){


  //console.log(api_key.Nomics_API_Key);
  // set up end date for api request
  let endDate=new Date();
  let dd=endDate.getDate();
  let mm=endDate.getMonth();
  let yyyy=endDate.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }


  endDate=yyyy+'-'+mm+'-'+dd;
  // console.log(endDate);

  //console.log(data.start_date.substring(0,10));


  const response=await axios.get(`${API_URL}?key=${data.Nomics_API_Key}&currency=${data.supported_currency}&start=${data.start_date.substring(0,10)}T00%3A00%3A00Z&end=${endDate}T00%3A00%3A00Z&cors=true`);

  return response;
}
