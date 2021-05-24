// FUNCTION TO MAKE CALLS TO OUR BACKEND API ROUTES!
//import axios from 'axios';
// function for calling our Backend to get all logs
const API_URL='http://localhost:5000';

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
