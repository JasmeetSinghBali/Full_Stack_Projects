import * as React from 'react';
import { useState,useEffect } from 'react';
import ReactMapGL,{ Marker,Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'react-bootstrap/Image';
// backend API fetch function
import {listLogEntries} from './API';

// importing the pop up new add log entry component
import LogEntryForm from './LogEntryForm';

import {getLocation} from './API';

require('dotenv').config();
//console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);


const App=() => {
  const [logEntries,setLogEntries] = useState([]);
  // popup useState
  //const [showPopup, togglePopup] = React.useState(false);
  const [showPopup,setShowPopup] = useState({});

  // use state for popup add entry logs
  const [addEntryLocation,setAddEntryLocation]=useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 2
  });

  const [loc,setLoc]=useState();
  const [subDivision,setsubDivision]=useState();
  const [locDescription,setlocDescription]=useState();

  // function to refresh all the map component on the map after new marker by user via form is added on the map.
  const getEntries=async()=>{
    const logEntries=await listLogEntries();
    setLogEntries(logEntries);
  };

  // useEffect function that will run only once when the Map component is Mounted
  useEffect(()=>{

    getEntries();

    // immediately invoked function expression IIFE (()=>{})() the last () are for executing the IIFE and (()=>{}) is a IIFE basic syntax
    // (async()=>{
    //   const logEntries=await listLogEntries();
    //   // set the logentries to the log entries we fetched from backend
    //   //console.log(logEntries);
    //   setLogEntries(logEntries);
    // })();
  },[])// [] is the dependacy array



 // function to handle double click to add a log entry with marker in UI by doble clicking the location on the map.
 const showAddMarkerPopup=(event)=>{
   //console.log(event);// will have a lngLat array to grab longitude latitude of the location where the user double clicked
   const [longitude,latitude]=event.lngLat;
   setAddEntryLocation({
     latitude,
     longitude
   });
   //console.log("I am inside double click handler")
   //console.log(latitude,longitude);
   //console.log('===========');
   getLocation(latitude,longitude)
   .then(
     (data)=>{
       const locDetails={
         continent:data.continent,
         country:data.countryName,
         subdivision:data.principalSubdivision,
         locdescription:data.localityInfo
       }
       //console.log(data);
       //console.log(locDetails.locdescription.informative[1].name+','+locDetails.locdescription.informative[1].description+','+locDetails.locdescription.administrative[1].description+','+locDetails.locdescription.administrative[2].name);
       setLoc(locDetails.country);
       setsubDivision(locDetails.subdivision);
       setlocDescription(locDetails.locdescription.informative[1].name+','+locDetails.locdescription.informative[1].description+','+locDetails.locdescription.administrative[1].description+','+locDetails.locdescription.administrative[2].name);
     }
   )
   .catch(
     (err)=>{console.log(err)}
   );

 }



  return (
    <ReactMapGL
    {...viewport}
    mapStyle="mapbox://styles/alpacinoj/ckobddu730zzo17o2nejdttvs"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    onViewportChange={nextViewport => setViewport(nextViewport)}
    onDblClick={showAddMarkerPopup}
    >
     {
       logEntries.map(entry=>(
         <React.Fragment key={entry._id}>
         <Marker
          latitude={entry.latitude}
          longitude={entry.longitude}
          >
          <div onClick={()=>setShowPopup(
            { // commented the spreading out for each click pop up so that only 1 pop up appears at a time.
              //...showPopup,
            [entry._id]:true}
          )}>

            <svg
            className="marker"
            style={{
              width:`${6*viewport.zoom}`,
              height:`${6*viewport.zoom}`
            }}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

         </Marker>
         {
           showPopup[entry._id] ? (
           <Popup
             latitude={entry.latitude}
             longitude={entry.longitude}
             closeButton={true}
             closeOnClick={false}
             dynamicPosition={true}
             onClose={()=>setShowPopup({})}
                // commented this line so that only one pop up appears at a time on map
               //{...showPopup,[entry._id]:false}

             anchor="top"
             sortByDepth={true} >
             <div className="popup">
               {!entry.image ? <Image src="../public/newlog.gif" alt="No Image was Uploaded for this entry!" rounded/>:<Image src={entry.image} alt={entry.title} rounded />}
               <hr />
               <h3>🎯Location Description: </h3><p>{entry.description}</p>
               <small><b>Visited On: {new Date(entry.visitDate).toLocaleDateString()}</b></small>
               <hr/>
               <h5>🧳 Comments: </h5><p>  {entry.comments} </p>
               <hr />
               <h5>🏷️ Tag: {entry.title} </h5>
               <h5>😍 Rating: {entry.rating==='NaN'?'Not Rated 😶':entry.rating}</h5>
               <hr />
               <small className="devmes"><b>Emoji Cipher:
                   ✌️ + 🖱️ + 🗺️ + ✍️ = ❌  </b></small>
             </div>
           </Popup>
         ):null
       }
       </React.Fragment>
     ))
   }

   {/*to show  a marker with pop up form for new log entry when use double clicks on location on map.*/}
   {
     addEntryLocation ? (
       <>
       <Marker
        latitude={addEntryLocation.latitude}
        longitude={addEntryLocation.longitude}
        >
        <div>

          <svg
          className="notvismark"
          style={{
            width:`${6*viewport.zoom}`,
            height:`${6*viewport.zoom}`
          }}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

       </Marker>
        <Popup
        latitude={addEntryLocation.latitude}
        longitude={addEntryLocation.longitude}
        closeButton={true}
        closeOnClick={false}
        dynamicPosition={true}
        onClose={()=>setAddEntryLocation(null)}
        anchor="top"
        tipSize={16} >
         <div className="popup">
           <h3> New Log ✏️ 📑</h3>
           <LogEntryForm
            onClose={()=>{
             setAddEntryLocation(null);
             getEntries();
           }}
            location={addEntryLocation}
            locCountry={loc}
            locDivision={subDivision}
            locDescription={locDescription}/>
         </div>
       </Popup>
       </>
     ):null
   }
    </ReactMapGL>
  );
}

export default App;
