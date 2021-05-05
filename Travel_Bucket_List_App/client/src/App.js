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


  return (
    <ReactMapGL
    {...viewport}
    mapStyle="mapbox://styles/alpacinoj/ckobddu730zzo17o2nejdttvs"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    onViewportChange={nextViewport => setViewport(nextViewport)}
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
            {...showPopup,[entry._id]:true}
          )}>
            <svg
            className="marker"
            style={{
              width:`${6*viewport.zoom}`,
              height:`${6*viewport.zoom}`
            }}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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
             onClose={()=>setShowPopup(
               {...showPopup,[entry._id]:false}
             )}
             anchor="top" >
             <div>
               <h3>{entry.title}</h3>
               <p>{entry.comments}</p>
             </div>
           </Popup>
         ):null
       }
       </>
     ))
   }
    </ReactMapGL>
  );
}

export default App;
