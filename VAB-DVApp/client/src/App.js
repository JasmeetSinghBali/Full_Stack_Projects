import React,{useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alan_key='';

const App=()=>{

  useEffect(()=>{
    alanBtn({
      key: alan_key,
      onCommand:({command})=>{
        if(command==='testCommand'){
          alert('this worked');
        }
      }
    })
  },[])

  return(
    <>
      <h1>Started.....</h1>
    </>
  )
}

export default App;
