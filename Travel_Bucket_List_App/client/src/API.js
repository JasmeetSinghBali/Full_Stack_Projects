// function for calling our Backend
const API_URL='http://localhost:5000';

export async function listLogEntries(){
  const rawData=await fetch(`${API_URL}/api/logs`);

  // return the log entries via our API
  return rawData.json();

}

// Function to send new log entry data from frontend form to backend
export async function createLogEntry(entry){
  const response=await fetch(`${API_URL}/api/logs`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(entry)
  });
  return response.json();
}


export async function getLocation(latitude,longitude){
  try{
    const response=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const result=response.json();
    console.log('Reverse Geocoding Success!!')
    return result;
  }catch(err){
    console.log(err);
    return 'Reverse Geocoding Failed!!';
  }
  // ===============add a try catch here===============
 //  const getLocs=async(latitude,longitude)=>{
 //    var response=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
 //    return response.json();
 //  }
 //  const getLocation=async(latitude,longitude)=>{
 //    getLocs().then((data)=>{
 //      console.log(data);
 //      return data
 //    })
 //
 //    //const result=locs.map(el=>[el.countryName]);
 //    //return result;
 // }
}
