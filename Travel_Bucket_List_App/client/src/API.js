// FUNCTION TO MAKE CALLS TO OUR BACKEND API ROUTES!
import axios from 'axios';
// function for calling our Backend to get all logs

// this way when we deploy client side it is going to talk to the backend deployed at vercel/now.sh
const API_URL= window.location.hostname=== 'localhost' ? 'http://localhost:5000' : 'https://travel-bucket-app.vercel.app';

export async function listLogEntries(){
  const rawData=await fetch(`${API_URL}/api/logs`);

  // return the log entries via our API
  return rawData.json();

}

// Function to send new log entry data from frontend form to backend
export async function createLogEntry(entry){

  const apiKey=entry.apiKey;

  // to delete the api key from the body of the request
  delete entry.apiKey;

  const response=await fetch(`${API_URL}/api/logs`,{
    method:'POST',
    headers:{
      'Content-type':'application/json',
      'Accept': 'text/html',
      'X-GLOBAL-API-KEY': apiKey
    },
    body:JSON.stringify(entry)
  });
  console.log(entry);

  // handling if fetch causes error we need to handle explicitely as fetch dont do that where as axios handles the error.
  let json = await response.json();
  console.log(json);
  console.log(response);
  if (response.ok){
    return json;
  }
  // the below is automatically done by axios on its own unlike fetch
  const error=new Error(json);
  error.response = json;
  throw error;
}


// function to get location and its description via latitude longitude that was captured when user double clicked on the map.
export async function getLocation(latitude,longitude){
  try{
    const response=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const result=response.json();
    //console.log('Reverse Geocoding Success!!')
    return result;
  }catch(err){
    //console.log(err);
    return 'Reverse Geocoding Failed!!';
  }
  //const result=locs.map(el=>[el.countryName]);


}

// function to store the flagged User Ip and info at backend
export async function addFlaggedUser(){
  try{
    const response=await axios.get('https://api.bigdatacloud.net/data/ip-geolocation-full?localityLanguage=en&key=49be126a76104adf88862171845e2c99');
    const data = response.data;
    console.log(data);
    console.log('sending user data to backend!');
    const result=await fetch(`${API_URL}/api/add/flaggedUser`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(data)
    })
    return result.json();

  }catch(err){
    //console.log(err);
    return 'Flagged User Undetected! Could not store the flagged user in DB.';
  }
}




// // ==========BACKEND VERSION THE IMAGE STRING,ARRAY,BASE^$ ENCODED STRINGIFIED OBJECT GETs DESTROYED REACHING AT BACKEND Function to upload the Image to cloudinary
// export async function uploadImageToCloudinary(imagesStringArray){
//     try{
//       console.log("inside upload function to cloudinary! stringified version");
//       console.log(JSON.stringify(imagesStringArray));
//       return 'calling backend image upload';
//
//
//
//      //MAKE CALL TO THE BACKEND API ENDPOINT TO STORE THESE IMAGES TO CLOUDINARY
//
//       // const response=await fetch(`${API_URL}/api/uploadImage/toCloudinary`,{
//       //     method:'POST',
//       //     headers:{
//       //       'Content-type':'application/json'
//       //     },
//       //     body:JSON.stringify(imagesStringObject)
//       //   });
//       //  const result=response.json();
//       //  return result;
//     }catch(err){
//       console.log(err);
//     }
//   }
