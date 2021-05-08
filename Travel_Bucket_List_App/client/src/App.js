import * as React from 'react';
import { useState,useEffect } from 'react';
import ReactMapGL,{ Marker,Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// backend API fetch function
import {listLogEntries} from './API';

require('dotenv').config();
// console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);


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

  // useEffect function that will run only once when the Map component is Mounted
  useEffect(()=>{

    // immediately invoked function expression IIFE (()=>{})() the last () are for executing the IIFE and (()=>{}) is a IIFE basic syntax
    (async()=>{
      const logEntries=await listLogEntries();
      // set the logentries to the log entries we fetched from backend
      //console.log(logEntries);
      setLogEntries(logEntries);
    })();
  },[])// [] is the dependacy array


 // function to handle double click to add a log entry with marker in UI by doble clicking the location on the map.
 const showAddMarkerPopup=(event)=>{
   //console.log(event);// will have a lngLat array to grab longitude latitude of the location where the user double clicked
   const [longitude,latitude]=event.lngLat;
   setAddEntryLocation({
     latitude,
     longitude
   })
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
         <>
         <Marker
          key={entry._id}
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

             anchor="top" >
             <div className="popup">
               <h3>{entry.title}</h3>
               <p>{entry.comments}</p>
               <small>Visited On: {new Date(entry.visitDate).toLocaleDateString()}</small>
             </div>
           </Popup>
         ):null
       }
       </>
     ))
   }
   {/*to show  a marker when use double clicks on location on map.*/}
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
        anchor="top" >
         <div className="popup">
           <h3> ✏️ New Log to Travel-Bucket 📑</h3>
           <p>Name</p>
           <p>comments</p>
         </div>
       </Popup>
       </>
     ):null
   }
    </ReactMapGL>
  );
}

export default App;
